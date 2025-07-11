import { IAttributeObject } from '../../components/form/formInterface/forms.model';

export interface LoginValues {
  username: string;
  password: string;
  companyHasUserId?: number;
}

export interface ILoginForm {
  setIsForgotPassword?: (status: boolean) => void;
  type?: string;
  login_attributes: IAttributeObject;
  onSubmit: (values: LoginValues) => void;
  handelForgotPassword?: (e: any) => void;
}

export interface IForgotPasswordForm {
  setIsForgotPassword?: (status: boolean) => void;
}

export interface IForgotPasswordForm {
  setIsForgotPassword?: (status: boolean) => void;
}
