import { ILoggedUser } from '../../service/auth/auth.model';
import { MenuModal } from '../../types/layout';

export interface IAuthState {
  login: {
    loading: boolean;
    hasErrors: boolean;
    data: ILoggedUser | null;
  };
  isLogin: boolean;
  isCompanyHasUserIdSelected: boolean;
  companyHasUserId: number;
  roleTypeCode: string;
  isLoginDialogOpen: boolean;
  isSetPermissions: boolean;
  roleBaseMenu: MenuModal[];
}
