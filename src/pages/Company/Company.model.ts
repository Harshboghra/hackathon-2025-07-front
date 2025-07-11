import { ICompanyHasUser } from '../CompanyHasUser/CompanyHasUser.model';

export interface ICompanyForm {
  methods?: any;
  onSubmit?: (data: ICompany) => void;
  isEdit?: boolean;
}

export interface ICompanyList {
  data: ICompany[];
  selectedData: ICompany[];
  setSelectedData: (value: ICompany[]) => void;
  openNew?: () => void;
  dataLoading?: boolean;
}

export interface ICreateCompany {
  setCompanyDialog: (data: boolean) => void;
}
export interface IUpdateCompany {
  setCompanyDialog?: (data: boolean) => void;
  data?: ICompany;
}
export interface ICompany {
  id: number;
  name: string;
  organization_number: string;
  reference: string;
  active: boolean;
  created_by_company_has_user_id: number;
  our_reference_company_has_user_id: number;
  company_type_id: number;
  created: string;
  logo_file_id: number;
  created_by_company_has_user: ICompanyHasUser;
}

export type ICompanyInitialValues = Partial<ICompany>;
