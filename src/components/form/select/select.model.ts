export interface ISelect {
  attribute: string;
  form: any;
  handleChange?: (val: any) => void;
  loading?: boolean;
  appendTo?: "self" | HTMLElement | undefined | null;
  itemTemplate?: (option: any) => JSX.Element;
  valueTemplate?: (option: any, props: any) => JSX.Element;
  fieldType?: "top-label" | "no-label";
}
