import { Controller, useFormContext } from "react-hook-form";
import { inputValidator } from "../../../library/utilities/helperFunction";
import { Dropdown } from "primereact/dropdown";
import { ISelect } from "./select.model";
import { IFormFieldType } from "../../../library/utilities/constant";
import { FormFieldError } from "../../../components/form/formFieldError/FormFieldError";
import { useTranslation } from "react-i18next";

export const Select = (props: ISelect) => {
  const {
    attribute,
    form,
    fieldType,
    itemTemplate,
    valueTemplate,
    handleChange,
    appendTo,
  } = props;
  const { label, options, placeholder } = form[attribute];
  const { required, disabled } = form[attribute].rules;
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();
  const defaultPlaceHolder: string = t("components.select.placeholder");
  const getClassNames = () => {
    let labelClassName = "";
    let fieldClassName = "";
    let divClassName = "";

    switch (fieldType) {
      case IFormFieldType.NO_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "";
        break;
      case IFormFieldType.TOP_LABEL:
        labelClassName = "";
        fieldClassName = "field p-fluid";
        divClassName = "";
        break;
      default:
        labelClassName = "col-12 mb-3 md:col-3 md:mb-0";
        fieldClassName = "field grid";
        divClassName = "col-12 md:col-9 relative";
        break;
    }

    return { labelClassName, fieldClassName, divClassName };
  };
  const { labelClassName, fieldClassName, divClassName } = getClassNames();

  const labelElement = (
    <label htmlFor={attribute} className={labelClassName}>
      {label} {required && "*"}
    </label>
  );

  return (
    <div className={fieldClassName}>
      {fieldType !== IFormFieldType.NO_LABEL && labelElement}
      <div className={divClassName}>
        <Controller
          control={control}
          name={attribute}
          rules={inputValidator(form[attribute].rules, label)}
          render={({ field }) => (
            <Dropdown
              options={options}
              value={field.value}
              onChange={(val) => {
                field.onChange(val.value);
                handleChange && handleChange(val.value);
              }}
              className={`w-full ${errors[attribute] ? "p-invalid" : ""}`}
              placeholder={placeholder || defaultPlaceHolder}
              appendTo={appendTo}
              itemTemplate={itemTemplate}
              valueTemplate={valueTemplate}
              disabled={disabled}
            />
          )}
        />
        <FormFieldError data={{ errors, name: attribute }} />
      </div>
    </div>
  );
};
