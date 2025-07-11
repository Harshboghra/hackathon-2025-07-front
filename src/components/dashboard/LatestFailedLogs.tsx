import { useMemo } from 'react';
import { dateTemplate } from '../../library/utilities/helperFunction';
import { IProviderFlow } from '../../pages/Integration/Integration.model';
import { IIntegrationHasFlowHasLogs } from '../../pages/IntegrationHasFlowHasLogs/IntegrationHasFlowHasLogs.model';
import { useQuery } from '@apollo/client';
import { GET_All_FLOWS } from '../../service/graphql/queries/Provider/provider.query';
import { GET_LATEST_FAILED_INTEGRATION_HAS_FLOW_HAS_LOGS } from '../../service/graphql/queries/IntegrationHasFlowHasLogs/integrationHasFlowHasLogs.query';
import { useTranslation } from 'react-i18next';
import GenericDataTableWrapper from '../table/GenericDataTableWrapper';

export const LatestFailedLogs = () => {
  const { data, loading } = useQuery(
    GET_LATEST_FAILED_INTEGRATION_HAS_FLOW_HAS_LOGS,
  );
  const { t } = useTranslation();
  const { data: getFlows } = useQuery(GET_All_FLOWS);

  const logData = useMemo(
    () =>
      (data?.getLatestFailedIntegrationHasFlowHasLogs ?? []).map(
        (log: IIntegrationHasFlowHasLogs) => {
          const flow = (getFlows?.getAllProviderFlows ?? []).find(
            (flow: IProviderFlow) =>
              flow.key === log.integration_has_flow.flow_key,
          );
          return {
            ...log,
            integration_has_flow: {
              ...log.integration_has_flow,
              flow_key: flow?.name,
            },
          };
        },
      ),
    [data, getFlows],
  );

  const columns = [
    {
      field: 'integration_has_flow.integration.title',
      header: t(
        'objects.dashboard.integrationLog.latestFailedLogs.tableAttributes.title',
      ),
    },
    {
      field: 'integration_has_flow.integration.company.name',
      header: t(
        'objects.dashboard.integrationLog.latestFailedLogs.tableAttributes.company',
      ),
    },
    {
      field: 'integration_has_flow.flow_key',
      header: t(
        'objects.dashboard.integrationLog.latestFailedLogs.tableAttributes.integrationFlow',
      ),
    },
    {
      field: 'message',
      header: t(
        'objects.dashboard.integrationLog.latestFailedLogs.tableAttributes.message',
      ),
    },
    {
      field: 'created',
      header: t(
        'objects.dashboard.integrationLog.latestFailedLogs.tableAttributes.created',
      ),
      filter: false,
      template: (rowData: IIntegrationHasFlowHasLogs) =>
        dateTemplate(rowData.created) || '',
    },
  ];

  return (
    <div className="col-6">
      <div className="card">
        <GenericDataTableWrapper
          headerText={`${t(
            'objects.dashboard.integrationLog.latestFailedLogs.tableHeader',
          )} (${logData.length})`}
          columns={columns}
          sortField="created"
          sortOrder={-1}
          value={logData}
          dataLoading={loading}
        />
      </div>
    </div>
  );
};
