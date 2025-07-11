import { ErrorMessage } from "@hookform/error-message";
import { IError } from "./formField.model";

export const FormFieldError = (props: IError) => {
  return (
    <small className={`p-error ${props.data.className}`}>
      <ErrorMessage errors={props.data.errors} name={props.data.name} />
    </small>
  );
};
