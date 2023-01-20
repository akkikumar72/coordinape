import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import * as mutations from 'lib/gql/mutations';
import { useLocation, useNavigate } from 'react-router-dom';

import { Typography } from '@material-ui/core';

import { LoadingModal } from 'components';
import { useSelectedCircle } from 'recoilState';
import { paths } from 'routes/paths';
import { Button } from 'ui';

interface ConnectIntegrationConfig {
  name: string;
  test(params: URLSearchParams): boolean;
  create(params: URLSearchParams): {
    integrationName: string;
    integrationConfig: unknown;
  };
}

export const DEWORK = 'dework';
export const WONDER = 'wonder';

const integrationConfigs: ConnectIntegrationConfig[] = [
  {
    name: DEWORK,
    test: params =>
      params.has('dework_organization_id') &&
      params.has('dework_organization_name'),
    create(params) {
      const organizationId = params.get('dework_organization_id');
      const organizationName = params.get('dework_organization_name');
      const workspaceIdsString = params.get('dework_workspace_ids');
      const workspaceIds = workspaceIdsString
        ? workspaceIdsString.split(',')
        : undefined;
      return {
        integrationName:
          `${organizationName} on Dework` +
          (workspaceIds?.length ? ` (${workspaceIds.length} spaces)` : ''),
        integrationConfig: { organizationId, workspaceIds },
      };
    },
  },
  {
    name: WONDER,
    test: params =>
      params.has('wonder_organization_id') &&
      params.has('wonder_organization_name'),
    create(params) {
      const organizationId = params.get('wonder_organization_id');
      const organizationName = params.get('wonder_organization_name');
      const podIdsString = params.get('wonder_pod_ids');
      const podIds = podIdsString ? podIdsString.split(',') : undefined;
      return {
        integrationName:
          `${organizationName} on Wonder` +
          (podIds?.length ? ` (${podIds.length} spaces)` : ''),
        integrationConfig: { organizationId, podIds },
      };
    },
  },
];

export const IntegrationCallbackPage: FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = useMemo(() => new URLSearchParams(search), [search]);

  const [status, setStatus] = useState<'loading' | 'created' | 'failed'>(
    'loading'
  );
  const { circleId } = useSelectedCircle();

  const connectIntegration = useCallback(async () => {
    const integration = integrationConfigs.find(i => i.test(params));
    if (integration) {
      const data = integration.create(params);
      try {
        await mutations.createCircleIntegration(
          circleId,
          integration.name,
          data.integrationName,
          data.integrationConfig
        );
        setStatus('created');
      } catch {
        setStatus('failed');
      }
    } else {
      setStatus('failed');
    }
  }, []);

  useEffect(() => {
    connectIntegration();
  }, []);

  switch (status) {
    case 'loading':
      return <LoadingModal text="Connecting..." visible />;
    case 'failed':
    case 'created':
      return (
        <div style={{ height: '100%', display: 'grid', placeItems: 'center' }}>
          <div>
            <Typography variant="h4" align="center">
              {status === 'created'
                ? 'Integration Connected!'
                : 'Failed to connect integration!'}
            </Typography>
            <Button
              css={{ width: '100%', marginTop: '$lg' }}
              color="secondary"
              onClick={() => navigate(paths.circleAdmin(circleId))}
            >
              Back to Circle Overview
            </Button>
          </div>
        </div>
      );
  }
};
