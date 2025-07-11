import { EXTRA_FIELD_TYPE } from '../../library/utilities/constant';
import { IExtraFieldFormate } from '../../pages/Integration/Integration.model';
import { AutoCompleteSelect } from '../../components/form/autoCompleteSelect/AutoCompleteSelect';
import { Input } from '../form/input/Input';

// TODO: Add Language translation in label for extra field
export const RenderExtraFields = (props: {
  fields: IExtraFieldFormate[];
  keyName: string;
  initial: boolean;
}) => {
  const { fields, keyName, initial } = props;
  return (
    <>
      {fields
        .filter(
          (extraField) =>
            extraField.initialView === initial &&
            extraField.type === EXTRA_FIELD_TYPE.TEXT,
        )
        .map((extraField) => (
          <Input
            key={extraField.name}
            attribute={`${keyName}.${extraField.key}`}
            form={{
              [`${keyName}.${extraField.key}`]: {
                label: extraField.name,
                rules: {},
                placeholder: extraField.hint ? `eg: ${extraField.hint}` : '',
              },
            }}
          />
        ))}
      {fields
        .filter(
          (extraField) =>
            extraField.initialView === initial &&
            extraField.type === EXTRA_FIELD_TYPE.SELECT,
        )
        .map((extraField) => (
          <AutoCompleteSelect
            key={extraField.key}
            config={{
              attribute: `${keyName}.${extraField.key}`,
              form: {
                [`${keyName}.${extraField.key}`]: {
                  label: extraField.name,
                  rules: {},
                  options:
                    extraField.options?.map((option) => ({
                      label: option.name,
                      value: option.id,
                    })) ?? [],
                  placeholder: extraField.hint ? `eg: ${extraField.hint}` : '',
                },
              },
            }}
          />
        ))}
    </>
  );
};
