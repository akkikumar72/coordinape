import assert from 'assert';

import type { TransactionReceipt } from '@ethersproject/abstract-provider';
import { BigNumber } from '@ethersproject/bignumber';
import { AddressZero } from '@ethersproject/constants';
import * as Sentry from '@sentry/node';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import zipObject from 'lodash/zipObject';
import { DateTime, Settings } from 'luxon';

import { vault_tx_types_enum } from '../../../api-lib/gql/__generated__/zeus';
import { adminClient } from '../../../api-lib/gql/adminClient';
import { getProvider } from '../../../api-lib/provider';
import { Awaited } from '../../../api-lib/ts4.5shim';
import { verifyHasuraRequestMiddleware } from '../../../api-lib/validate';
import { encodeCircleId } from '../../../src/lib/vaults/circleId';
import { Contracts } from '../../../src/lib/vaults/contracts';
import { getUnwrappedAmount } from '../../../src/lib/vaults/tokens';
import { insert } from '../actions/_handlers/createVault';
import { logVaultTx } from '../actions/_handlers/createVaultTx';
import { updateClaims } from '../actions/_handlers/markClaimed';

Settings.defaultZone = 'utc';

const assertOrRemove = async (test: any, message: string, hash: string) => {
  if (test) return;
  await adminClient.mutate(
    {
      delete_pending_vault_transactions_by_pk: [
        { tx_hash: hash },
        { __typename: true },
      ],
    },
    { operationName: 'deletePendingVault_transactions_by_pk' }
  );
  throw message;
};

const getPendingTxRecords = async () => {
  const data = await adminClient.query(
    {
      pending_vault_transactions: [
        {},
        {
          __typename: true,
          created_at: true,
          created_by: true,
          tx_hash: true,
          tx_type: true,
          chain_id: true,
          org_id: true,
          claim_id: true,
          distribution_id: true,
        },
      ],
    },
    {
      operationName: 'getPendingTxRecords',
    }
  );
  return data.pending_vault_transactions;
};

type TxRecord = Awaited<ReturnType<typeof getPendingTxRecords>>[0];

const handleTxRecord = async (txRecord: TxRecord) => {
  const { chain_id, tx_hash, tx_type, created_at } = txRecord;

  // verify tx is more than 5 minutes old before operating
  // it's preferable to do this in the query but date diffs are brittle in
  // hasura
  if (DateTime.fromISO(created_at) > DateTime.now().minus({ minutes: 5 }))
    return 'not old enough';

  const provider = getProvider(chain_id);
  const tx = await provider.getTransaction(tx_hash);
  await assertOrRemove(tx, 'no tx found', tx_hash);
  if (typeof tx.blockNumber === null) return 'not yet mined';

  try {
    const receipt = await tx.wait();
    const contracts = new Contracts(chain_id, provider, true);

    switch (tx_type) {
      case 'Vault_Deploy':
        return handleVaultDeploy(contracts, txRecord, receipt);
      case 'Claim':
        return handleClaim(contracts, txRecord, receipt);
      case 'Distribution':
        return handleDistribution(contracts, txRecord, receipt);
      default:
        throw new Error(`unrecognized tx_type: ${tx_type}`);
    }
  } catch (e: any) {
    const error = (e?.message || e).toString();
    await assertOrRemove(
      !error.match(/transaction failed/),
      'tx failed',
      tx_hash
    );

    Sentry.captureException(e);
    return `unexpected error: ${error}`;
  }
};

const handleVaultDeploy = async (
  contracts: Contracts,
  record: TxRecord,
  receipt: TransactionReceipt
) => {
  const { tx_hash, org_id, chain_id, created_by } = record;

  // we can expect only one deployment log in a tx based on our app and contract
  // config. it's not possible to support multiple deployments in a tx given the
  // context that we have anyway
  const rawLog = receipt.logs
    .filter(log => log.address === contracts.vaultFactory.address)
    .pop();

  await assertOrRemove(rawLog, 'no event log found', tx_hash);
  assert(rawLog);
  const log = contracts.vaultFactory.interface.parseLog(rawLog);
  await assertOrRemove(
    log.name === 'VaultCreated',
    'event name mismatch',
    tx_hash
  );

  const vault = contracts.getVault(log.args.vault);
  const [simple_token_address, token_address] = await Promise.all([
    vault.simpleToken(),
    vault.token(),
  ]);
  const tokenAddress = [token_address, simple_token_address].find(
    e => e != AddressZero
  );
  await assertOrRemove(tokenAddress, 'invalid token address', tx_hash);
  assert(tokenAddress);
  const token = contracts.getERC20(tokenAddress);
  const [decimals, symbol] = await Promise.all([
    token.decimals(),
    token.symbol(),
  ]);

  const op = await insert({
    chain_id,
    decimals,
    deployment_block: receipt.blockNumber,
    org_id,
    profile_id: created_by,
    simple_token_address,
    symbol,
    token_address,
    tx_hash,
    vault_address: log.args.vault.toLowerCase(),
  });

  if (op.insert_vaults_one?.id) {
    await adminClient.mutate(
      {
        delete_pending_vault_transactions_by_pk: [
          { tx_hash },
          { __typename: true },
        ],
      },
      { operationName: 'deletePendingVaultTx' }
    );
  }

  return `added vault id ${op.insert_vaults_one?.id}`;
};

const handleClaim = async (
  contracts: Contracts,
  tx: TxRecord,
  receipt: TransactionReceipt
) => {
  const { claim_id, tx_hash } = tx;
  await assertOrRemove(claim_id, 'no claim id', tx_hash);

  const rawLog = receipt.logs
    .filter(log => log.address === contracts.distributor.address)
    .pop();

  await assertOrRemove(rawLog, 'no event log found', tx_hash);
  assert(rawLog);
  const log = contracts.distributor.interface.parseLog(rawLog);
  await assertOrRemove(log.name === 'Claimed', 'event name mismatch', tx_hash);

  const { claims_by_pk: data } = await adminClient.query(
    {
      claims_by_pk: [
        { id: claim_id },
        {
          profile_id: true,
          address: true,
          txHash: true,
          distribution: {
            vault: { vault_address: true },
            epoch: { circle: { id: true } },
          },
        },
      ],
    },
    {
      operationName: 'getClaims__recoverTransactions',
    }
  );

  await assertOrRemove(data, 'claim not found', tx_hash);
  assert(data);
  await assertOrRemove(!data?.txHash, 'tx_hash already set', tx_hash);
  const {
    profile_id,
    address,
    distribution: { epoch },
  } = data;
  assert(epoch.circle);

  // prevent linking claims to the wrong tx
  await assertOrRemove(
    log.args.account.toLowerCase() === address,
    'address mismatch',
    tx_hash
  );

  const update = await updateClaims(profile_id, claim_id, tx_hash);
  return `updated claims: [${update?.join(', ')}]`;
};

const handleDistribution = async (
  contracts: Contracts,
  tx: TxRecord,
  receipt: TransactionReceipt
) => {
  const { distribution_id, tx_hash } = tx;
  await assertOrRemove(distribution_id, 'no distribution id', tx_hash);

  const rawLog = receipt.logs
    .filter(log => log.address === contracts.distributor.address)
    .pop();

  await assertOrRemove(rawLog, 'no event log found', tx_hash);
  assert(rawLog);
  const log = contracts.distributor.interface.parseLog(rawLog);
  await assertOrRemove(
    log.name === 'EpochFunded',
    'event name mismatch',
    tx_hash
  );

  const { distributions_by_pk: data } = await adminClient.query(
    {
      distributions_by_pk: [
        { id: distribution_id },
        {
          vault: {
            id: true,
            vault_address: true,
            symbol: true,
            simple_token_address: true,
            decimals: true,
          },
          epoch: { circle_id: true },
          tx_hash: true,
          total_amount: true,
          distribution_json: [{}, true],
        },
      ],
    },
    { operationName: 'getDistributions__recoverTransactions' }
  );
  assert(data);
  await assertOrRemove(!data.tx_hash, 'tx_hash already set', tx_hash);

  const {
    epoch,
    total_amount,
    distribution_json,
    vault: {
      id: vault_id,
      vault_address,
      symbol,
      simple_token_address,
      decimals,
    },
  } = data;

  const previousAmount = BigNumber.from(distribution_json.previousTotal || 0);
  const amount = BigNumber.from(total_amount).sub(previousAmount);

  // these criteria don't strictly uniquely identify a distribution. if
  // you wanted to be stricter, you could compare timestamps of the tx and
  // the db row
  await assertOrRemove(
    vault_address.toLowerCase() === log.args.vault.toLowerCase() &&
      encodeCircleId(data.epoch.circle_id) === log.args.circle &&
      amount.toString() === log.args.amount.toString(),
    'data mismatch',
    tx_hash
  );

  const update = await adminClient.mutate(
    {
      update_distributions_by_pk: [
        {
          pk_columns: { id: distribution_id },
          _set: { tx_hash, distribution_epoch_id: log.args.epochId.toString() },
        },
        { id: true },
      ],
      delete_pending_vault_transactions_by_pk: [
        { tx_hash },
        { __typename: true },
      ],
    },
    { operationName: 'recoverDistribution' }
  );

  if (update.update_distributions_by_pk?.id) {
    const pps = await contracts.getPricePerShare(
      vault_address,
      simple_token_address,
      decimals
    );

    await logVaultTx({
      tx_type: vault_tx_types_enum.Distribution,
      tx_hash,
      distribution_id,
      circle_id: epoch.circle_id,
      vault_id,
      symbol: simple_token_address === AddressZero ? `Yearn ${symbol}` : symbol,
      amount: getUnwrappedAmount(amount, pps, decimals),
    });
  }

  return `updated distribution id ${update.update_distributions_by_pk?.id}`;
};

async function handler(req: VercelRequest, res: VercelResponse) {
  const txRecords = await getPendingTxRecords();

  const stackTraces: any[] = [];

  const results = await Promise.all(
    txRecords.map(async tx => {
      try {
        return await handleTxRecord(tx);
      } catch (err: any) {
        if (err.stack) stackTraces.push(err.stack);
        Sentry.captureException(err);
        return `error: ${err?.message || err}`;
      }
    })
  );

  res.status(200).json({
    processed_txs: zipObject(
      txRecords.map(t => t.tx_hash),
      results
    ),
    stackTraces,
  });
}

export default verifyHasuraRequestMiddleware(handler);
