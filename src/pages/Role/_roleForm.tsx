import { IRoleForm } from './Role.model';
import { FormProvider } from 'react-hook-form';
import { createOptionsForDropDown } from '../../library/utilities/helperFunction';
import { useQuery } from '@apollo/client';
import { GET_All_ROLE_TYPES } from '../../service/graphql/queries/RoleType/roleType.query';
import AppButton from '../../components/button/AppButton';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import { Input } from '../../components/form/input/Input';
import { TextArea } from '../../components/form/textArea/TextArea';
import { AutoCompleteSelect } from '../../components/form/autoCompleteSelect/AutoCompleteSelect';
import { useTranslation } from 'react-i18next';
import { BUTTON_TYPE } from '../../library/utilities/constant';

const RoleForm = (props: IRoleForm) => {
  const { methods, onSubmit, isEdit, mainRoles } = props;
  const { data: roleTypesData } = useQuery(GET_All_ROLE_TYPES);
  const { t } = useTranslation();

  let role_attributes: IAttributeObject = {
    name: {
      label: t('objects.role.attributes.name'),
      rules: {
        required: true,
      },
    },
    description: {
      label: t('objects.role.attributes.description'),
      rules: {},
    },
    role_type_id: {
      label: t('objects.role.attributes.roleType'),
      options: createOptionsForDropDown(
        roleTypesData?.getAllRoleType,
        'name',
        'id',
      ),
      rules: {
        required: true,
      },
    },
    parent_role_id: {
      label: t('objects.role.attributes.parentRole'),
      options: createOptionsForDropDown(mainRoles, 'name', 'id'),
      rules: { required: true },
    },
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input attribute="name" form={role_attributes} />
        <TextArea attribute="description" form={role_attributes} />
        <AutoCompleteSelect
          config={{
            attribute: 'role_type_id',
            form: role_attributes,
          }}
        />
        <AutoCompleteSelect
          config={{
            attribute: 'parent_role_id',
            form: role_attributes,
          }}
        />
        <AppButton
          type={BUTTON_TYPE.CHECK}
          label={`${
            isEdit
              ? t('components.button.name.update')
              : t('components.button.name.create')
          }`}
        />
      </form>
    </FormProvider>
  );
};
export default RoleForm;
