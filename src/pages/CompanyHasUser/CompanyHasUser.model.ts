import { ICompany } from '../Company/Company.model';
import { ICompanyHasUserRole } from '../Role/Role.model';
import { IUser } from '../User/User.model';

export interface ICompanyHasUserFormProps {
  methods?: any;
  onSubmit?: (data: ICompanyHasUser) => void;
  isEdit?: boolean;
}

export interface ICompanyHasUserListProps {
  selectedData?: ICompanyHasUser[];
  setSelectedData?: (value: ICompanyHasUser[]) => void;
  openNew?: () => void;
  companyHasUserData: ICompanyHasUser[];
}

export interface ICreateCompanyHasUser {
  userId: number;
}
export interface IUpdateCompanyHasUser {
  setCompanyHasUserDialog?: (data: boolean) => void;
  data?: ICompanyHasUser;
}

export interface ICompanyHasUser {
  id: number;
  created_by_company_has_user_id: number;
  company_id: number;
  user_id: number;
  email: string;
  phone: string;
  mobilephone: string;
  active: boolean;
  relation_type: string;
  created: string;
  user: IUser;
  company: ICompany;
  company_sub_organization_id?: number;
  role_id?: number;
  company_has_user_roles: ICompanyHasUserRole[];
}

export type ICompanyHasUserInitialValues = Partial<ICompanyHasUser>;
