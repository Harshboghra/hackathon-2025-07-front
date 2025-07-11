export interface IError {
  data: {
    errors: any;
    name: string;
    className?: string;
  };
}
