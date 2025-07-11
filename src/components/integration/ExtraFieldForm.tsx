import { FormProvider } from 'react-hook-form';
import AppButton from '../button/AppButton';
import { BUTTON_TYPE } from '../../library/utilities/constant';
import { useMemo } from 'react';
import { GET_All_PROVIDERS } from '../../service/graphql/queries/Provider/provider.query';
import { useQuery } from '@apollo/client';
import {
  IExtraFieldForm,
  IExtraFieldFormate,
  IIntegrationsFormFields,
  IProviderExtraFieldList,
  IProviders,
} from '../../pages/Integration/Integration.model';
import { convertEnabledFlowsIntoAnArray } from '../../library/utilities/helperFunction';
import { useTranslation } from 'react-i18next';
import { RenderExtraFields } from './RenderExtraFieldInput';

export const ExtraFieldForm = (props: IExtraFieldForm) => {
  const {
    methods,
    onSubmit,
    backToIntegration,
    providerExtraFieldListData,
    isEdit,
  } = props;
  const { t } = useTranslation();
  const { data: getProviders } = useQuery(GET_All_PROVIDERS);

  const stockListProviderData: IExtraFieldFormate[] = useMemo(() => {
    const stockProviderKey = methods.getValues('stock_manager_provider_key');
    const providerData = getProviders?.getAllProviders?.find(
      (provider: IProviders) => provider.key === stockProviderKey,
    );

    if (!providerData || !providerData.extraFieldFormate) {
      return [];
    }

    return providerData.extraFieldFormate.map(
      (extraField: IExtraFieldFormate) => {
        const providerListOptionsData = providerExtraFieldListData.find(
          (providerListData: IProviderExtraFieldList) =>
            providerListData.providerkey === providerData.key &&
            providerListData.key === extraField.key,
        );
        return {
          ...extraField,
          options: providerListOptionsData?.listData || [],
        };
      },
    );
  }, [providerExtraFieldListData, methods, getProviders?.getAllProviders]);

  const shopListProviderData: IExtraFieldFormate[] = useMemo(() => {
    const shopProviderKey = methods.getValues('shop_manager_provider_key');
    const providerData = getProviders?.getAllProviders?.find(
      (provider: IProviders) => provider.key === shopProviderKey,
    );

    if (!providerData || !providerData.extraFieldFormate) {
      return [];
    }

    return providerData.extraFieldFormate.map(
      (extraField: IExtraFieldFormate) => {
        const providerListOptionsData = providerExtraFieldListData.find(
          (providerListData: IProviderExtraFieldList) =>
            providerListData.providerkey === providerData.key &&
            providerListData.key === extraField.key,
        );
        return {
          ...extraField,
          options: providerListOptionsData?.listData || [],
        };
      },
    );
  }, [providerExtraFieldListData, methods, getProviders]);

  const handleSubmit = (data: IIntegrationsFormFields) => {
    const payload = {
      company_id: data.company_id,
      stock_manager_provider_key: data.stock_manager_provider_key,
      shop_manager_provider_key: data.shop_manager_provider_key,
      stock_manager_api_key: data.stock_manager_api_key,
      shop_manager_api_key: data.shop_manager_api_key,
      stock_manager_extra_field: JSON.stringify(data.stock_manager_extra_field),
      shop_manager_extra_field: JSON.stringify(data.shop_manager_extra_field),
      enabled_flows: convertEnabledFlowsIntoAnArray(data.enabled_flows),
      active: data.active ? true : false,
      title: data.title ?? null,
    };

    onSubmit?.(payload);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(handleSubmit)}>
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <h5 className="text-center underline text-black-alpha-70">
                {t('objects.integration.formAttributes.stockTitle')}
              </h5>
              <RenderExtraFields
                fields={stockListProviderData || []}
                keyName="stock_manager_extra_field"
                initial={false}
              />
            </div>
            <div className="border-1 border-black-alpha-20" />
            <div className="flex-1">
              <h5 className="text-center underline text-black-alpha-70">
                {t('objects.integration.formAttributes.shopTitle')}
              </h5>
              <RenderExtraFields
                fields={shopListProviderData || []}
                keyName="shop_manager_extra_field"
                initial={false}
              />
            </div>
          </div>
          <hr />
          <div className="flex justify-content-between">
            <AppButton
              type={BUTTON_TYPE.PREVIOUS}
              onClick={() => backToIntegration()}
            />
            <AppButton
              type={BUTTON_TYPE.CHECK}
              label={
                isEdit
                  ? t('components.button.name.update')
                  : t('components.button.name.create')
              }
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
};
