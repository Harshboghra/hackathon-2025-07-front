import { useQuery } from '@apollo/client';
import { GET_All_INTEGRATION_HAS_FLOW_HAS_LOGS } from '../../service/graphql/queries/IntegrationHasFlowHasLogs/integrationHasFlowHasLogs.query';
import { useNavigate, useParams } from 'react-router-dom';
import { GET_All_FLOWS } from '../../service/graphql/queries/Provider/provider.query';
import { IIntegrationHasFlowHasLogs } from './IntegrationHasFlowHasLogs.model';
import { IProviderFlow } from '../Integration/Integration.model';
import { useMemo } from 'react';
import {
  dateTemplate,
  logStatusTemplate,
} from '../../library/utilities/helperFunction';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { MultiSelects } from '../../components/form/multiSelect/MultiSelects';
import { FLOW_TYPE } from '../../library/utilities/constant';
import AppButton from '../../components/button/AppButton';
import { useTranslation } from 'react-i18next';
import ExpandingLogRequestTable from '../../components/IntegrationHasFlowHasLogs/ExpandingLogRequestTable';
import GenericDataTableWrapper from '../../components/table/GenericDataTableWrapper';

const IntegrationHasFlowHasLogsList = (props: {
  intgerationId?: number;
  backToIntegration?: () => void;
}) => {
  const { intgerationId, backToIntegration } = props;
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const initialValue = [
    FLOW_TYPE.ORDER_SYNC,
    FLOW_TYPE.STATUS_UPDATE,
    FLOW_TYPE.STOCK_SYNC,
  ];
  const methods = useForm({
    defaultValues: {
      flow_select: '',
    },
  });
  const flowData = useWatch({
    name: 'flow_select',
    control: methods.control,
  });

  const { data, loading } = useQuery(GET_All_INTEGRATION_HAS_FLOW_HAS_LOGS, {
    variables: {
      integrationId: intgerationId ?? Number(id),
      flowKey: flowData.length > 0 ? flowData : initialValue,
    },
    skip: !intgerationId && !id,
  });

  const { data: getFlows } = useQuery(GET_All_FLOWS);

  const logData = useMemo(
    () =>
      (data?.getAllIntegrationHasFlowHasLogs ?? []).map(
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
            status: logStatusTemplate(log.is_success),
            created: Number(log.created),
          };
        },
      ),
    [data, getFlows],
  );

  const flowOptions = useMemo(
    () =>
      getFlows?.getAllProviderFlows.map((flow: IProviderFlow) => ({
        value: flow.key,
        label: flow.name,
      })) ?? [],
    [getFlows],
  );

  const columns = [
    {
      field: 'integration_has_flow.flow_key',
      header: t('objects.integrationLog.tableAttributes.integrationFlow'),
    },
    {
      field: 'message',
      header: t('objects.integrationLog.tableAttributes.message'),
    },
    {
      field: 'status',
      header: 'Status',
    },
    {
      field: 'created',
      filter: false,
      template: (rowData: IIntegrationHasFlowHasLogs) =>
        dateTemplate(rowData.created),
      header: t('objects.integrationLog.tableAttributes.created'),
    },
  ];

  const rowExpansionTemplate = (data: IIntegrationHasFlowHasLogs) => {
    return <ExpandingLogRequestTable logId={data.id} />;
  };

  return (
    <>
      <FormProvider {...methods}>
        <div className="flex align-items-center justify-content-between">
          <div className="mb-3">
            <AppButton
              type="Secondary"
              icon="pi pi-arrow-left"
              onClick={() =>
                backToIntegration ? backToIntegration() : navigate(-1)
              }
              tooltip={t('objects.integrationLog.tooltips.backToIntegration')}
            />
          </div>
          <div className="col-3">
            <MultiSelects
              attribute="flow_select"
              form={{
                flow_select: {
                  label: t('objects.integrationLog.formAttributes.flow'),
                  rules: {},
                  options: flowOptions,
                },
              }}
            />
          </div>
        </div>
      </FormProvider>
      <GenericDataTableWrapper
        headerText={t('objects.integrationLog.tableHeader')}
        dataLoading={loading}
        rowExpansionTemplate={rowExpansionTemplate}
        sortField="created"
        sortOrder={-1}
        columns={columns}
        value={logData ?? []}
      />
    </>
  );
};
export default IntegrationHasFlowHasLogsList;
