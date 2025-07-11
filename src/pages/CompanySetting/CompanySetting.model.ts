export interface ICompanySettingForm {
  methods?: any;
  onSubmit?: (data: any) => void;
  isEdit?: boolean;
  logoData?: string;
}
export interface ICompanySettingInput {
  name: string;
  logo_base64: string;
}
export interface ICompanySettingData {
  id: number;
  name: string;
  logo_base64?: string;
}
