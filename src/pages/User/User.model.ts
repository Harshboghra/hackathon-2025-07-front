import { ICompanyHasUser } from '../CompanyHasUser/CompanyHasUser.model';

export interface IUserForm {
  methods?: any;
  onSubmit?: (data: IUser) => void;
  isEdit?: boolean;
  companyId?: number;
  handleInviteOnClick?: () => void;
  isInActiveUser?: boolean;
}

export interface IUserList {
  data: IUser[];
  selectedData: IUser[];
  setSelectedData: (value: IUser[]) => void;
  openNew?: () => void;
  companyId?: number;
}

export interface IUserIndex {
  companyId?: number;
}

export interface ICreateUser {
  setUserDialog: (data: boolean) => void;
  companyId?: number;
}
export interface IUpdateUser {
  setUserDialog?: (data: boolean) => void;
  data?: IUser | ICurrentUser;
  useFor?: string;
}
export interface IUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  phone: string;
  mobilephone: string;
  active: boolean;
  note: string;
  __typename?: string;
  created_by_company_has_user_id?: number;
  company_has_users?: ICompanyHasUser[];
}

export interface IUserIndex {
  company_id?: number;
}

export interface ICurrentUser {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  mobilephone: string;
  active: boolean;
  validEmails: string[];
  password?: string;
  companyHasUserId?: number;
  __typename?: string;
  company_has_users: ICompanyHasUser[];
}

export interface IMergeUser {
  user_id: number;
  userName: string;
}

export type IUserInitialValues = Partial<IUser | ICurrentUser>;
