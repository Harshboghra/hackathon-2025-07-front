export interface IPermissionUpdate {}
export interface IPermission {}
export interface IPermissionForm {
  methods?: any;
  onSubmit?: (data: number[]) => void;
  permissionData: any;
}

export interface IPage {
  permissions: IPermission[];
  id: number;
  name: string;
  code: string;
  parent_page_id: any;
  active: boolean;
  sequence: number;
}
export interface IRoleHasPermission {
  __typename: string;
  permission: IPermission;
  id: number;
  role_id: number;
  permission_id: number;
  created: string;
}

export interface IPermission {
  __typename: string;
  id: number;
  page_action: IPageAction;
  page: IPage;
}

export interface IPageAction {
  __typename: string;
  id: number;
  name: string;
}

export interface IPermissionView {
  [key: string]: {
    label: string;
    value: number;
  }[];
}
