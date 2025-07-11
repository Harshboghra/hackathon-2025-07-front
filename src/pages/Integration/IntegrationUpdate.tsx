import { useQuery } from '@apollo/client';
import { useState, useContext, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { MUTATION_TYPE_UPDATE } from '../../service/mutation.service';
import {
  IIntegration,
  IUpdateIntegration,
  IIntegrationsFormFields,
  IIntegrationHasFlowData,
  IIntegrationFlow,
} from './Integration.model';
import { GET_All_INTEGRATIONS } from '../../service/graphql/queries/Integration/integration.query';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import { IntegrationForm } from './_integrationForm';
import { mutateIntegration } from '../../service/graphql/mutation/integration/validateIntegration.mutation';

const IntegrationUpdate = (props: IUpdateIntegration) => {
  const { data, setIntegrationDialog } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [id, setId] = useState<number>();
  const { refetch } = useQuery(GET_All_INTEGRATIONS);

  const createEnabledFlows = (data: IIntegrationHasFlowData[]) => {
    let temp: Record<string, IIntegrationFlow> = {};
    data.map((flow: IIntegrationHasFlowData) => {
      temp[flow.flow_key] = {
        id: flow.id,
        flow_key: flow.flow_key,
        cron_frequancy_in_minutes: flow.active
          ? flow.cron_frequancy_in_minutes
          : null,
        flow_extra_field: JSON.parse(flow.flow_extra_field),
        active: flow.active,
      };
    });
    return temp;
  };

  const initialValues: IIntegrationsFormFields = useMemo(
    () => ({
      stock_manager_provider_key: data?.stock_manager_provider_key ?? '',
      shop_manager_provider_key: data?.shop_manager_provider_key ?? '',
      stock_manager_api_key: data?.stock_manager_api_key ?? '',
      shop_manager_api_key: data?.shop_manager_api_key ?? '',
      stock_manager_extra_field: data?.stock_manager_extra_field
        ? JSON.parse(data?.stock_manager_extra_field)
        : {},
      shop_manager_extra_field: data?.shop_manager_extra_field
        ? JSON.parse(data?.shop_manager_extra_field)
        : {},
      company_id: data?.company_id ?? 0,
      enabled_flows: data?.integration_has_flows
        ? createEnabledFlows(data?.integration_has_flows)
        : {},
      active: data?.active ?? true,
      title: data?.title ?? '',
    }),
    [data],
  );

  const methods = useForm({
    values: initialValues,
  });

  useEffect(() => {
    if (data) {
      setId(data.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (values: IIntegration) => {
    mutateIntegration({ ...values, id: id }, MUTATION_TYPE_UPDATE).then(
      (res) => {
        pushMessageFromMutationResponse(res.response);
        if (res.success) {
          refetch();
          if (setIntegrationDialog) {
            setIntegrationDialog(false);
          }
        } else {
          setErrorsToForm(res?.response, methods);
        }
      },
    );
  };

  return (
    <IntegrationForm methods={methods} onSubmit={onSubmit} isEdit={true} />
  );
};

export default IntegrationUpdate;
