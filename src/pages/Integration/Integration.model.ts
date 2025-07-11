export interface IIntegrationForm {
  methods: any;
  onSubmit: (data: IIntegration) => void;
  isEdit?: boolean;
}

export interface IValidateIntegrationForm {
  methods: any;
  onValidate?: (data: IIntegrationsFormFields) => void;
}

export interface IExtraFieldForm {
  methods: any;
  onSubmit: (data: IIntegration) => void;
  isEdit?: boolean;
  backToIntegration: () => void;
  providerExtraFieldListData: IProviderExtraFieldList[];
}

export interface IIntegrationList {
  data: IIntegrationListData[];
  selectedData: IIntegration[];
  setSelectedData: (value: IIntegration[]) => void;
  openNew?: () => void;
  showLogs?: (id: number) => void;
}

export interface ICreateIntegration {
  setIntegrationDialog: (data: boolean) => void;
}
export interface IUpdateIntegration {
  setIntegrationDialog?: (data: boolean) => void;
  data?: IIntegrationListData;
}
export interface IIntegration {
  id?: number;
  stock_manager_provider_key: string;
  shop_manager_provider_key: string;
  stock_manager_api_key: string;
  shop_manager_api_key: string;
  stock_manager_extra_field: string;
  shop_manager_extra_field: string;
  company_id: number;
  enabled_flows: IIntegrationFlow[];
  active?: boolean;
  title?: string;
}

export interface IIntegrationListData {
  id: number;
  created_by_company_has_user_id: number;
  stock_manager_provider_key: string;
  shop_manager_provider_key: string;
  stock_manager_api_key: string;
  shop_manager_api_key: string;
  stock_manager_extra_field: string;
  shop_manager_extra_field: string;
  company_id: number;
  integration_has_flows: IIntegrationHasFlowData[];
  active: boolean;
  created: string;
  title: string;
}

export interface IIntegrationHasFlowData {
  id: number;
  flow_key: string;
  cron_frequancy_in_minutes: number;
  flow_extra_field: string;
  active: boolean;
}

export interface IIntegrationsFormFields {
  company_id: number;
  shop_manager_api_key: string;
  stock_manager_api_key: string;
  stock_manager_provider_key: string;
  shop_manager_provider_key: string;
  enabled_flows: {
    [key: string]: IIntegrationFlow;
  };
  shop_manager_extra_field: {
    [key: string]: string;
  };
  stock_manager_extra_field: {
    [key: string]: string;
  };
  active: boolean;
  title: string;
}

export interface IIntegrationFlow {
  id: number | null;
  flow_key: string;
  active: boolean;
  cron_frequancy_in_minutes: number | null;
  flow_extra_field: string;
}

export interface IProviders {
  key: string;
  name: string;
  type: string;
  active: boolean;
  currentApiVersion?: string;
  extraFieldFormate: IExtraFieldFormate[];
  flow: IProviderFlow[];
}

export interface IExtraFieldFormate {
  key: string;
  name: string;
  type: string;
  options?: IProviderExtraFieldListData[];
  hint?: string;
  initialView?: boolean;
}

export interface IProviderFlow {
  key: string;
  name: string;
  parent?: string;
  hasCronFrequency: boolean;
  extraFieldFormate?: IExtraFieldFormate[];
}

export type IIntegrationInitialValues = Partial<IIntegrationListData>;

export interface IFlowNode {
  key: string;
  name: string;
  hasCronFrequency: boolean;
  children?: IFlowNode[];
}

export interface IProviderExtraFieldList {
  key: string;
  providerkey: string;
  listData: IProviderExtraFieldListData[];
}

export interface IProviderExtraFieldListData {
  id: string;
  name: string;
}
