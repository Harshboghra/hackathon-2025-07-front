import { useContext, useState } from 'react';
import {
  IIntegrationForm,
  IIntegrationsFormFields,
  IProviderExtraFieldList,
} from './Integration.model';
import { STOCK_PROVIDERS } from '../../library/utilities/constant';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import ValidateIntegrationForm from '../../components/integration/ValidateIntegrationForm';
import { ExtraFieldForm } from '../../components/integration/ExtraFieldForm';
import { mutateIntegration } from '../../service/graphql/mutation/integration/validateIntegration.mutation';
import { convertEnabledFlowsIntoAnArray } from '../../library/utilities/helperFunction';
import { MUTATION_TYPE_VALIDATE } from '../../service/mutation.service';

export const IntegrationForm = (props: IIntegrationForm) => {
  const { methods, onSubmit, isEdit } = props;
  const [viewNextForm, setViewNextForm] = useState<boolean>(false);
  const [providerExtraFieldListData, setProviderExtraFieldListData] =
    useState<IProviderExtraFieldList[]>();
  const { pushMessageFromMutationResponse } = useContext(MessageContext);

  const onValidateIntegration = (values: IIntegrationsFormFields) => {
    let responseAttribute;
    if (values.stock_manager_provider_key === STOCK_PROVIDERS.MINTSOFT) {
      //TODO: Remove Hard Coded condition
      responseAttribute = [
        'providerListResponse {key providerkey listData {id name}}',
      ];
    }

    const newValues = {
      stock_manager_provider_key: values.stock_manager_provider_key,
      shop_manager_provider_key: values.shop_manager_provider_key,
      stock_manager_api_key: values.stock_manager_api_key,
      shop_manager_api_key: values.shop_manager_api_key,
      stock_manager_extra_field: JSON.stringify(
        values.stock_manager_extra_field,
      ),
      shop_manager_extra_field: JSON.stringify(values.shop_manager_extra_field),
      company_id: values.company_id,
      enabled_flows: convertEnabledFlowsIntoAnArray(values.enabled_flows),
    };

    mutateIntegration(
      newValues,
      MUTATION_TYPE_VALIDATE,
      responseAttribute,
    ).then((res) => {
      pushMessageFromMutationResponse(res?.response);
      if (res?.success) {
        //TODO: add logic if there is no providerListResponse data then it should automatically submit without next
        if (
          res?.response?.providerListResponse &&
          res.response.providerListResponse.length > 0
        ) {
          setProviderExtraFieldListData(res.response.providerListResponse);
          setViewNextForm(true);
        }
      } else {
        setErrorsToForm(res?.response, methods);
      }
    });
  };

  return (
    <>
      {viewNextForm ? (
        <ExtraFieldForm
          methods={methods}
          onSubmit={onSubmit}
          backToIntegration={() => setViewNextForm(false)}
          providerExtraFieldListData={providerExtraFieldListData ?? []}
          isEdit={isEdit}
        />
      ) : (
        <ValidateIntegrationForm
          methods={methods}
          onValidate={onValidateIntegration}
        />
      )}
    </>
  );
};
