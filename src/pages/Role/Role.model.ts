export interface IRoleForm {
  methods?: any;
  onSubmit?: (data: IRole) => void;
  isEdit?: boolean;
  mainRoles?: IRole[];
}

export interface IRoleList {
  data: IRole[];
  selectedData?: IRole[];
  setSelectedData?: (value: IRole[]) => void;
  openNew?: () => void;
  mainRoles?: IRole[];
}

export interface ICreateRole {
  setRoleDialog?: (data: boolean) => void;
  mainRoles?: IRole[];
}
export interface IUpdateRole {
  setRoleDialog?: (data: boolean) => void;
  data: IRole;
  mainRoles?: IRole[];
}
export interface IRole {
  id: number;
  name: string;
  description: string;
  role_type_id: number;
  parent_role_id: number;
  role_type: {
    code: string;
  };
}

export interface ICompanyHasUserRole {
  id: number;
  created_by_company_has_user_id: number;
  company_has_user_id: number;
  role_id?: number;
  created: string;
  role?: IRole;
}

export type IRoleInitialValues = Partial<IRole>;
