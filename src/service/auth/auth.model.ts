export interface ILogin {
  username: string;
  password: string;
}

export interface IResetPassword {
  token?: string;
  password: string;
  confirmPassword: string;
}

export interface ILoggedUser {
  access_token: string;
  refresh_token: string;
}

export interface IAssignCompanyHasUserId {
  user_id: number;
  company_has_user_id: number;
}
