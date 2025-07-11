import { useQuery } from '@apollo/client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { MUTATION_TYPE_CREATE } from '../../service/mutation.service';
import { IIntegration, ICreateIntegration } from './Integration.model';
import { GET_All_INTEGRATIONS } from '../../service/graphql/queries/Integration/integration.query';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import { IntegrationForm } from './_integrationForm';
import { mutateIntegration } from '../../service/graphql/mutation/integration/validateIntegration.mutation';

const IntegrationCreate = (props: ICreateIntegration) => {
  const { setIntegrationDialog } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const { refetch } = useQuery(GET_All_INTEGRATIONS);
  const methods = useForm({
    defaultValues: {
      stock_manager_provider_key: '',
      shop_manager_provider_key: '',
      stock_manager_api_key: '',
      shop_manager_api_key: '',
      stock_manager_extra_field: {},
      shop_manager_extra_field: {},
      company_id: 0,
      enabled_flows: [],
    },
  });

  const onSubmit = (values: IIntegration) => {
    mutateIntegration(values, MUTATION_TYPE_CREATE).then((res) => {
      pushMessageFromMutationResponse(res?.response);
      if (res?.success) {
        setIntegrationDialog(false);
        refetch();
        methods.reset();
      } else {
        setErrorsToForm(res?.response, methods);
      }
    });
  };

  return (
    <IntegrationForm methods={methods} onSubmit={onSubmit} isEdit={false} />
  );
};
export default IntegrationCreate;
