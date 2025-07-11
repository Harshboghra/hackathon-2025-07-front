import { TreeNode } from "primereact/treenode";

export interface IFormProps {
  attribute: string;
  style?: any;
  form: {
    [attribute: string]: IAttribute_Object;
  };
  dialog?: (data: boolean) => void;
  addDialogTrigger?: boolean;
  className?: string;
  handleChange?: (data: any) => void;
  phoneIcon?: boolean;
  text?: string;
  ignoreValueOnAllSelect?: any[];
  moreOptions?: any;
  handleOnHide?: (data: number[]) => void;
  appendTo?: "self" | HTMLElement | undefined | null;
  fieldType?: string;
  disable?: boolean;
  itemTemplate?: (option: any) => JSX.Element;
  valueTemplate?: (option: any, props: any) => JSX.Element;
  suffixIcon?: {
    icon: string;
    handleClick: () => void;
  };
  handleBlurEvent?: (data: any) => void;
  loading?: boolean;
  defaultTime?: IDefaultTime;
  customToolBar?: any;
}

export interface IDefaultTime {
  defaultFromTime: string | undefined;
  defaultToTime: string | undefined;
}

export interface IAttribute_Object {
  maxDate?: string;
  minDate?: string;
  label: string;
  options?: IOptions[] | undefined;
  rules: IRules;
  explanation?: string;
  errors?: string;
  placeholder?: string;
  treeOptions?: TreeNode[];
  extraLabelElementContent?: JSX.Element;
  filter?: string;
}
export interface IOptions {
  label: string | any;
  value?: string | number;
  code?: string | number;
  items?: IOptions[];
  extra_label?: string;
  tableAttributes?: { [key: string]: any };
  icon?: string;
}
export interface IRules {
  type?: string;
  required?: boolean;
  maxLength?: number;
  minLength?: number;
  max?: number;
  min?: number;
  patterns?: string | RegExp;
  disabled?: boolean;
  valueAsDate?: boolean;
  rows?: number;
  email?: boolean;
  showButtons?: boolean;
  decimals?: boolean;
  showTime?: boolean;
  multiple?: boolean;
  placeholder?: string;
  allowEmpty?: boolean;
  showIcon?: boolean;
  itemPerRow?: number;
  isExpand?: boolean;
  dateView?: {
    view: any;
    format: string;
  };
}
export interface IAttributeObject {
  [key: string]: IAttribute_Object;
}
