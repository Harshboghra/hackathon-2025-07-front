import { IUserForm } from './User.model';
import { FormProvider } from 'react-hook-form';
import { createOptionsForDropDown } from '../../library/utilities/helperFunction';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { GET_All_ROLES } from '../../service/graphql/queries';
import { useMemo } from 'react';
import AppButton from '../../components/button/AppButton';
import { IRole } from '../Role/Role.model';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import { Input } from '../../components/form/input/Input';
import { CheckBox } from '../../components/form/checkBox/CheckBox';
import { AutoCompleteSelect } from '../../components/form/autoCompleteSelect/AutoCompleteSelect';
import { BUTTON_TYPE } from '../../library/utilities/constant';
import { ability } from '../../library/ability/ability';
import { PERMISSION } from '../../library/utilities/permission.constant';

const UserForm = (props: IUserForm) => {
  const { methods, onSubmit, isEdit, handleInviteOnClick, isInActiveUser } =
    props;
  const { data: getAllRoles } = useQuery(GET_All_ROLES, {
    skip: !ability.can(PERMISSION.ACTION.VIEW, PERMISSION.PAGE.ROLES),
  });
  const { t } = useTranslation();
  const customRoles = useMemo(() => {
    if (getAllRoles?.getAllRole) {
      const filteredData = getAllRoles.getAllRole.filter(
        (role: IRole) => role.parent_role_id !== null,
      );
      return filteredData ?? [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getAllRoles]);

  let user_attributes: IAttributeObject = {
    first_name: {
      label: t('objects.user.attributes.first_name'),
      rules: {},
    },
    last_name: {
      label: t('objects.user.attributes.last_name'),
      rules: {},
    },

    role_id: {
      label: t('objects.user.attributes.roleName'),
      options:
        customRoles && createOptionsForDropDown(customRoles, 'name', 'id'),
      rules: {},
    },

    email: {
      label: t('objects.user.attributes.email'),
      rules: {},
    },
    phone: {
      label: t('objects.user.attributes.phone'),
      rules: {},
    },
    mobilephone: {
      label: t('objects.user.attributes.mobilephone'),
      rules: {},
    },

    active: {
      label: isEdit
        ? t('objects.user.attributes.active')
        : t('objects.user.attributes.inviteUser'),
      rules: {},
    },
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input attribute="first_name" form={user_attributes} />
        <Input attribute="last_name" form={user_attributes} />
        {!isEdit && (
          <>
            <AutoCompleteSelect
              config={{ attribute: 'role_id', form: user_attributes }}
            />
            <Input attribute="email" form={user_attributes} />
            <Input attribute="phone" form={user_attributes} phoneIcon />
            <Input attribute="mobilephone" form={user_attributes} phoneIcon />
          </>
        )}
        <CheckBox attribute="active" form={user_attributes} />
        {isInActiveUser && isEdit && (
          <span className="mr-2">
            <AppButton
              buttonType={'button'}
              type={BUTTON_TYPE.CHECK}
              label={t('objects.user.attributes.inviteUser')}
              onClick={handleInviteOnClick}
            />
          </span>
        )}
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

export default UserForm;
