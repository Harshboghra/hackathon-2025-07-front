import { IAttributeObject } from '../form/formInterface/forms.model';
import { Input } from '../form/input/Input';
import {
  IFlowNode,
  IProviderFlow,
  IProviders,
  IValidateIntegrationForm,
} from '../../pages/Integration/Integration.model';
import { FormProvider } from 'react-hook-form';
import AppButton from '../button/AppButton';
import { GET_All_PROVIDERS } from '../../service/graphql/queries/Provider/provider.query';
import { useQuery } from '@apollo/client';
import { BUTTON_TYPE, PROVIDER_TYPE } from '../../library/utilities/constant';
import { useMemo, useState } from 'react';
import { AutoCompleteSelect } from '../../components/form/autoCompleteSelect/AutoCompleteSelect';
import { GET_All_ADMIN_COMPANIES_LIGHT } from '../../service/graphql/queries';
import { createOptionsForDropDown } from '../../library/utilities/helperFunction';
import { ICompany } from '../../pages/Company/Company.model';
import FlowCheckboxTree from '../../components/integration/FlowCheckboxTree';
import { CheckBox } from '../../components/form/checkBox/CheckBox';
import { useTranslation } from 'react-i18next';
import { RenderExtraFields } from './RenderExtraFieldInput';

const ValidateIntegrationForm = (props: IValidateIntegrationForm) => {
  const { methods, onValidate } = props;
  const { t } = useTranslation();
  const { data: getProviders } = useQuery(GET_All_PROVIDERS);
  const { data: getCompanies } = useQuery(GET_All_ADMIN_COMPANIES_LIGHT);
  const stockProviderKey = methods.watch('stock_manager_provider_key');
  const shopProviderKey = methods.watch('shop_manager_provider_key');

  const [showStockKey, setShowStockKey] = useState<boolean>(false);
  const [showShopKey, setShowShopKey] = useState<boolean>(false);

  const stockManagerOptions = useMemo(
    () =>
      getProviders?.getAllProviders
        .filter(
          (provider: IProviders) =>
            provider.type === PROVIDER_TYPE.STOCK_MANAGER,
        )
        .map((provider: IProviders) => {
          return {
            value: provider.key,
            label: provider.name,
          };
        }),
    [getProviders],
  );

  const companyOptions = useMemo(() => {
    if (getCompanies?.getAllAdminCompany) {
      return createOptionsForDropDown(
        getCompanies?.getAllAdminCompany.filter(
          (company: ICompany) => company.active,
        ),
        'name',
        'id',
      );
    }
  }, [getCompanies?.getAllAdminCompany]);

  const shopManagerOptions = useMemo(
    () =>
      getProviders?.getAllProviders
        .filter(
          (provider: IProviders) =>
            provider.type === PROVIDER_TYPE.SHOP_MANAGER,
        )
        .map((provider: IProviders) => {
          return {
            value: provider.key,
            label: provider.name,
          };
        }),
    [getProviders],
  );

  function buildFlowTree(flows: IProviders['flow']): IFlowNode[] {
    const nodeMap: Record<string, IFlowNode> = {};
    const tree: IFlowNode[] = [];

    flows.forEach((flow) => {
      nodeMap[flow.key] = {
        key: flow.key,
        name: flow.name,
        hasCronFrequency: flow.hasCronFrequency,
        children: [],
      };
    });

    flows.forEach((flow) => {
      if (flow.parent && nodeMap[flow.parent]) {
        nodeMap[flow.parent].children!.push(nodeMap[flow.key]);
      } else {
        tree.push(nodeMap[flow.key]);
      }
    });

    return tree;
  }

  const selectedStockProvider: IProviders = useMemo(() => {
    const provider = getProviders?.getAllProviders.find(
      (provider: IProviders) => provider.key === stockProviderKey,
    );
    if (!provider) return null;

    return provider;
  }, [stockProviderKey, getProviders?.getAllProviders]);

  const selectedShopProvider: IProviders = useMemo(() => {
    const provider = getProviders?.getAllProviders.find(
      (provider: IProviders) => provider.key === shopProviderKey,
    );
    if (!provider) return null;

    return provider;
  }, [shopProviderKey, getProviders?.getAllProviders]);

  const commonFlows = useMemo(() => {
    if (!selectedStockProvider || !selectedShopProvider) return [];

    const stockFlowKeys = selectedStockProvider.flow.map(
      (flow: IProviderFlow) => flow.key,
    );
    const shopFlowKeys = selectedShopProvider.flow.map(
      (flow: IProviderFlow) => flow.key,
    );

    const sharedKeys = stockFlowKeys.filter((key: string) =>
      shopFlowKeys.includes(key),
    );

    const sharedFlow = selectedStockProvider.flow.filter(
      (flow: IProviderFlow) => sharedKeys.includes(flow.key),
    );
    return buildFlowTree(sharedFlow);
  }, [selectedStockProvider, selectedShopProvider]);

  let integration_attributes: IAttributeObject = {
    stock_manager_provider_key: {
      label: t('objects.integration.formAttributes.stockProvider'),
      rules: {},
      options: stockManagerOptions ?? [],
    },
    shop_manager_provider_key: {
      label: t('objects.integration.formAttributes.shopProvider'),
      rules: {},
      options: shopManagerOptions ?? [],
    },
    stock_manager_api_key: {
      label: t('objects.integration.formAttributes.stockApiKey'),
      rules: {
        type: showStockKey ? 'text' : 'password',
      },
    },
    shop_manager_api_key: {
      label: t('objects.integration.formAttributes.shopApiKey'),
      rules: {
        type: showShopKey ? 'text' : 'password',
      },
    },
    company_id: {
      label: t('objects.integration.formAttributes.comapnyId'),
      rules: {},
      options: companyOptions,
    },
    active: {
      label: t('objects.integration.formAttributes.active'),
      rules: {},
    },
    title: {
      label: t('objects.integration.formAttributes.title'),
      rules: {},
    },
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onValidate)}>
        <AutoCompleteSelect
          config={{
            attribute: 'company_id',
            form: integration_attributes,
          }}
        />
        <CheckBox attribute="active" form={integration_attributes} />
        <Input attribute="title" form={integration_attributes} />
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <h5 className="text-center underline text-black-alpha-70">
              {t('objects.integration.formAttributes.stockTitle')}
            </h5>
            <AutoCompleteSelect
              config={{
                attribute: 'stock_manager_provider_key',
                form: integration_attributes,
              }}
            />
            <Input
              attribute="stock_manager_api_key"
              form={integration_attributes}
              suffixIcon={{
                icon: showStockKey ? 'pi pi-eye-slash' : 'pi pi-eye',
                handleClick: () => setShowStockKey(!showStockKey),
              }}
            />
            <RenderExtraFields
              fields={selectedStockProvider?.extraFieldFormate || []}
              keyName="stock_manager_extra_field"
              initial
            />
          </div>
          <div className="border-1 border-black-alpha-20" />
          <div className="flex-1">
            <h5 className="text-center underline text-black-alpha-70">
              {t('objects.integration.formAttributes.shopTitle')}
            </h5>
            <AutoCompleteSelect
              config={{
                attribute: 'shop_manager_provider_key',
                form: integration_attributes,
              }}
            />
            <Input
              attribute="shop_manager_api_key"
              form={integration_attributes}
              suffixIcon={{
                icon: showShopKey ? 'pi pi-eye-slash' : 'pi pi-eye',
                handleClick: () => setShowShopKey(!showShopKey),
              }}
            />
            <RenderExtraFields
              fields={selectedShopProvider?.extraFieldFormate || []}
              keyName="shop_manager_extra_field"
              initial
            />
          </div>
        </div>
        <hr />
        {commonFlows.map((node) => (
          <FlowCheckboxTree node={node} />
        ))}
        {methods.formState.errors.enabled_flows && (
          <p className="p-error text-sm">
            {methods.formState.errors.enabled_flows.message}
          </p>
        )}
        <AppButton
          type={BUTTON_TYPE.PRIMARY}
          label={t('components.button.name.validateIntegration')}
        />
      </form>
    </FormProvider>
  );
};

export default ValidateIntegrationForm;
