import { ICompanyHasUserFormProps } from './CompanyHasUser.model';
import { FormProvider } from 'react-hook-form';
import { createOptionsForDropDown } from '../../library/utilities/helperFunction';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { IRole } from '../Role/Role.model';
import {
  GET_All_ADMIN_COMPANIES_LIGHT,
  GET_All_ROLES,
} from '../../service/graphql/queries';
import { useLazyQuery, useQuery } from '@apollo/client';
import { Input } from '../../components/form/input/Input';
import { AutoCompleteSelect } from '../../components/form/autoCompleteSelect/AutoCompleteSelect';
import { CheckBox } from '../../components/form/checkBox/CheckBox';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import AppButton from '../../components/button/AppButton';
import { ICompany } from '../Company/Company.model';
import { BUTTON_TYPE } from '../../library/utilities/constant';

const CompanyHasUserForm = (props: ICompanyHasUserFormProps) => {
  const { methods, onSubmit, isEdit } = props;
  const { t } = useTranslation();
  const { data: rolesData } = useQuery(GET_All_ROLES);
  const [getAllAdminCompany, { data }] = useLazyQuery(
    GET_All_ADMIN_COMPANIES_LIGHT,
  );

  useMemo(() => {
    getAllAdminCompany();
  }, [getAllAdminCompany]);

  const customRoles = useMemo(() => {
    if (rolesData?.getAllRole) {
      const filteredData = rolesData.getAllRole.filter(
        (role: IRole) => role.parent_role_id !== null,
      );
      return filteredData ?? [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rolesData]);

  const companyOptions = useMemo(() => {
    if (data?.getAllAdminCompany) {
      return createOptionsForDropDown(
        data?.getAllAdminCompany.filter((company: ICompany) => company.active),
        'name',
        'id',
      );
    }

    return [];
  }, [data?.getAllAdminCompany]);

  const company_has_user_attributes: IAttributeObject = {
    company_id: {
      label: t('objects.user.attributes.company_id'),
      options: companyOptions,
      rules: {
        required: true,
      },
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
    role_id: {
      label: t('objects.user.attributes.roleName'),
      options:
        customRoles && createOptionsForDropDown(customRoles, 'name', 'id'),
      rules: {
        required: true,
      },
    },
    active: {
      label: t('objects.user.attributes.active'),
      rules: {},
    },
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {isEdit ? (
          <>
            <Input attribute="email" form={company_has_user_attributes} />
            <Input attribute="phone" form={company_has_user_attributes} />
            <Input attribute="mobilephone" form={company_has_user_attributes} />
          </>
        ) : (
          <AutoCompleteSelect
            config={{
              attribute: 'company_id',
              form: company_has_user_attributes,
            }}
          />
        )}

        <AutoCompleteSelect
          config={{
            attribute: 'role_id',
            form: company_has_user_attributes,
          }}
        />
        <CheckBox attribute="active" form={company_has_user_attributes} />

        <AppButton
          type={BUTTON_TYPE.PRIMARY}
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

export default CompanyHasUserForm;
