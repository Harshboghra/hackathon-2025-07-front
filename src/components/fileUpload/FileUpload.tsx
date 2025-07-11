import { FileUpload, FileUploadSelectEvent } from 'primereact/fileupload';
import { useFormContext } from 'react-hook-form';
import { IFormProps } from '../form/formInterface/forms.model';
import { FormFieldError } from '../form/formFieldError/FormFieldError';
import { FILE_SIZE } from '../../library/utilities/constant';
import { inputValidator } from './../../library/utilities/helperFunction';

const FileUploads = (props: IFormProps) => {
  const { attribute, form, className } = props;
  const { label } = form[attribute];
  const { required } = form[attribute].rules;
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext();

  const onTemplateUpload = (e: FileUploadSelectEvent) => {
    setValue(attribute, e.files);
  };
  return (
    <div className={`field p-fluid ${className}`}>
      <label htmlFor={attribute}>
        {label}
        {required && '*'}
      </label>

      <FileUpload
        mode="basic"
        id={attribute}
        accept="image/*"
        onSelect={onTemplateUpload}
        {...register(attribute, {
          ...inputValidator(form[attribute].rules, label),
        })}
        maxFileSize={FILE_SIZE.MAX_FILE_SIZE}
      />

      <FormFieldError data={{ errors: errors, name: attribute }} />
    </div>
  );
};

export default FileUploads;
