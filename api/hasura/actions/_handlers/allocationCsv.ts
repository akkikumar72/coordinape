import assert from 'assert';

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';

import { authCircleAdminMiddleware } from '../../../../api-lib/circleAdmin';
import { DISTRIBUTION_TYPE } from '../../../../api-lib/constants';
import { formatCustomDate } from '../../../../api-lib/dateTimeHelpers';
import { adminClient } from '../../../../api-lib/gql/adminClient';
import { getEpoch } from '../../../../api-lib/gql/queries';
import { getInput } from '../../../../api-lib/handlerHelpers';
import { errorResponseWithStatusCode } from '../../../../api-lib/HttpError';
import { uploadCsv } from '../../../../api-lib/s3';
import { Awaited } from '../../../../api-lib/ts4.5shim';
import { claimsUnwrappedAmount } from '../../../../src/common-lib/distributions';

const allocationCsvInput = z
  .object({
    circle_id: z.number().int().positive(),
    grant: z.number().positive().min(1).max(1000000000).optional(),
    epoch: z.number().int().optional(),
    epoch_id: z.number().int().optional(),
    form_gift_amount: z.number().min(0).optional().default(0),
    gift_token_symbol: z.string().optional(),
  })
  .strict()
  .refine(
    data => data.epoch || data.epoch_id,
    'Either epoch or a epoch_id must be provided.'
  );

async function handler(req: VercelRequest, res: VercelResponse) {
  const { payload } = await getInput(req, allocationCsvInput, {
    allowAdmin: true,
  });

  const { circle_id, epoch_id, epoch, form_gift_amount, gift_token_symbol } =
    payload;
  const epochObj = await getEpoch(circle_id, epoch_id, epoch);
  if (!epochObj) {
    return errorResponseWithStatusCode(
      res,
      { message: 'Epoch does not exist in this circle' },
      422
    );
  }
  const grant = payload.grant ?? epochObj.grant;

  const totalTokensSent = epochObj.token_gifts.length
    ? epochObj.token_gifts.reduce((total, { tokens }) => total + tokens, 0)
    : 0;
  const circle = await getCircleDetails(
    circle_id,
    epochObj.id,
    epochObj.end_date
  );
  assert(circle, 'No Circle Found');
  const fixedPaymentsEnabled = !!circle.fixed_payment_token_type;

  const userValues = generateCsvValues(
    circle,
    form_gift_amount,
    gift_token_symbol,
    totalTokensSent,
    fixedPaymentsEnabled,
    circle.fixed_payment_token_type,
    grant
  );
  const headers = [
    'No',
    'name',
    'address',
    'received',
    'sent',
    'givers',
    'percentage_of_give',
    'circle_rewards',
    'circle_rewards_token',
  ];
  if (fixedPaymentsEnabled) {
    headers.push('fixed_payment_rewards');
    headers.push('fixed_payment_token_symbol');
  }
  if (grant) headers.push('Grant_amt');
  let csvText = `${headers.join(',')}\r\n`;
  userValues.forEach(rowValues => {
    csvText += `${rowValues.join(',')}\r\n`;
  });
  const epochName = epochObj.description ?? `epoch-${epochObj.number}`;
  const fileName = `${epochObj.circle?.organization?.name}-${
    epochObj.circle?.name
  }-${epochName}-date-${formatCustomDate(
    epochObj.start_date,
    'ddLLyy'
  )}-${formatCustomDate(epochObj.end_date, 'ddLLyy')}.csv`;
  const result = await uploadCsv(
    `${circle_id}/${epochObj.id}/${uuidv4()}/${fileName}`,
    csvText
  );

  res.status(200).json({
    file: result.Location,
  });
}

export function generateCsvValues(
  circle: CircleDetails,
  formGiftAmount: number,
  giftTokenSymbol: string | undefined,
  totalTokensSent: number,
  fixedPaymentsEnabled: boolean,
  fixedPaymentTokenType: string | undefined,
  grant: number | undefined
) {
  assert(circle, 'No Circle Found');
  assert(circle.epochs[0], 'No Epoch Found');

  const distEpoch = circle.epochs[0];
  const circleDist = distEpoch.distributions.find(
    d =>
      d.distribution_type === DISTRIBUTION_TYPE.GIFT ||
      d.distribution_type === DISTRIBUTION_TYPE.COMBINED
  );
  const fixedDist = distEpoch.distributions.find(
    d =>
      d.distribution_type === DISTRIBUTION_TYPE.FIXED ||
      d.distribution_type === DISTRIBUTION_TYPE.COMBINED
  );

  giftTokenSymbol = circleDist ? circleDist.vault.symbol : giftTokenSymbol;
  const { users } = circle;

  return (
    users?.map((u, idx) => {
      const claimAmt: number =
        circleDist?.claims.find(c => c.profile_id === u.profile?.id)
          ?.new_amount || 0;

      const { circleClaimed: cClaimed, fixedPayment } = claimsUnwrappedAmount({
        address: u.address,
        fixedDistDecimals: fixedDist?.vault.decimals,
        fixedGifts: fixedDist?.distribution_json.fixedGifts,
        fixedDistPricePerShare: fixedDist?.vault.price_per_share,
        circleDistDecimals: circleDist?.vault.decimals,
        circleDistClaimAmount: claimAmt,
        circleDistPricePerShare: circleDist?.vault.price_per_share,
      });
      const received = u.received_gifts.length
        ? u.received_gifts
            .map(g => g.tokens)
            .reduce((total, tokens) => tokens + total)
        : 0;

      const circleClaimed = circleDist
        ? cClaimed
        : formGiftAmount * givenPercent(received, totalTokensSent);

      const rowValues: (string | number)[] = [
        idx + 1,
        (u.deleted_at ? '(Deleted) ' : '') + u.profile.name,
        u.address,
        received,
        u.sent_gifts.length
          ? u.sent_gifts
              .map(g => g.tokens)
              .reduce((total, tokens) => tokens + total)
          : 0,
        u.received_gifts.length,
        (givenPercent(received, totalTokensSent) * 100).toFixed(2),
        circleClaimed.toFixed(2),
        giftTokenSymbol || '',
      ];
      if (fixedPaymentsEnabled && fixedPaymentTokenType) {
        const fixedAmount = fixedDist ? fixedPayment : u.fixed_payment_amount;
        rowValues.push(fixedAmount.toFixed(2));
        rowValues.push(fixedPaymentTokenType);
      }
      if (grant)
        rowValues.push(
          received
            ? Math.floor(((received * grant) / totalTokensSent) * 100) / 100
            : 0
        );

      return rowValues;
    }) || []
  );
}

export type CircleDetails = Awaited<ReturnType<typeof getCircleDetails>>;

export async function getCircleDetails(
  circle_id: number,
  epochId: number,
  epochEndDate: string
) {
  const { circles_by_pk } = await adminClient.query(
    {
      circles_by_pk: [
        { id: circle_id },
        {
          fixed_payment_token_type: true,
          epochs: [
            {
              where: { id: { _eq: epochId } },
            },
            {
              distributions: [
                { where: { tx_hash: { _is_null: false } } },
                {
                  distribution_type: true,
                  distribution_json: [{}, true],
                  vault: {
                    symbol: true,
                    chain_id: true,
                    vault_address: true,
                    simple_token_address: true,
                    decimals: true,
                    price_per_share: true,
                  },
                  claims: [
                    {},
                    {
                      new_amount: true,
                      address: true,
                      profile_id: true,
                    },
                  ],
                },
              ],
            },
          ],
          users: [
            {
              where: {
                _or: [
                  { deleted_at: { _is_null: true } },
                  { deleted_at: { _gt: epochEndDate } },
                ],
              },
            },
            {
              id: true,
              address: true,
              deleted_at: true,
              fixed_payment_amount: true,
              profile: { id: true, name: true },
              received_gifts: [
                { where: { epoch_id: { _eq: epochId } } },
                { tokens: true },
              ],
              sent_gifts: [
                { where: { epoch_id: { _eq: epochId } } },
                { tokens: true },
              ],
            },
          ],
        },
      ],
    },
    { operationName: 'allocationCsv_getGifts' }
  );
  const epoch = circles_by_pk?.epochs[0];
  return {
    ...circles_by_pk,
    epochs: [{ ...epoch, distributions: epoch?.distributions || [] }],
  };
}

export default authCircleAdminMiddleware(handler);

const givenPercent = (received: number, totalGive: number) => {
  return received / totalGive;
};
