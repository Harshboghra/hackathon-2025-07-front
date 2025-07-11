export interface ResetPasswordValue {
  password: string;
  confirmPassword: string;
}

export interface IResetPasswordForm {
  onFormSubmit: (value: ResetPasswordValue, methods: any) => Promise<any>;
  className?: string;
}
