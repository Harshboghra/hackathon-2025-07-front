import { ICompanyForm } from './Company.model';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useMemo } from 'react';
import { UserContext } from '../../contexts/user';
import { useLazyQuery } from '@apollo/client';
import { ICompanyHasUser } from '../CompanyHasUser/CompanyHasUser.model';
import { GET_COMPANY_HAS_USERS } from '../../service/graphql/queries';
import AppButton from '../../components/button/AppButton';
import { IAttributeObject } from '../../components/form/formInterface/forms.model';
import { Input } from '../../components/form/input/Input';
import { CheckBox } from '../../components/form/checkBox/CheckBox';
import { AutoCompleteSelect } from '../../components/form/autoCompleteSelect/AutoCompleteSelect';
import { BUTTON_TYPE } from '../../library/utilities/constant';

const CompanyForm = (props: ICompanyForm) => {
  const { t } = useTranslation();
  const { methods, onSubmit, isEdit } = props;
  const { user } = useContext(UserContext);
  const [getAllUser, { data: getUsers }] = useLazyQuery(GET_COMPANY_HAS_USERS);

  useEffect(() => {
    if (user?.companyHasUserId) {
      getAllUser({
        variables: {
          companyHasUserId: user.companyHasUserId,
        },
      });
    }
  }, [user, getAllUser]);

  const referenceUserOptions = useMemo(() => {
    if (getUsers?.getCurrentUser) {
      const currentCompanyHasUsers =
        getUsers.getCurrentUser.company_has_users[0].company.company_has_users;

      return currentCompanyHasUsers.map((companyHasUser: ICompanyHasUser) => {
        return {
          value: companyHasUser.id,
          label:
            companyHasUser.user?.first_name +
            ' ' +
            companyHasUser.user?.last_name,
        };
      });
    }

    return [];
  }, [getUsers]);

  let company_attributes: IAttributeObject = {
    name: {
      label: t('objects.company.attributes.name'),
      rules: {},
    },
    organization_number: {
      label: t('objects.company.attributes.organization_number'),
      rules: {},
    },
    reference: {
      label: t('objects.company.attributes.reference'),
      rules: {},
    },
    our_reference_company_has_user_id: {
      label: t('objects.company.attributes.our_reference_company_has_user_id'),
      options: referenceUserOptions,
      rules: {},
    },
    active: {
      label: t('objects.company.attributes.active'),
      rules: {},
    },
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Input attribute="name" form={company_attributes} />
        <Input attribute="organization_number" form={company_attributes} />
        <AutoCompleteSelect
          config={{
            attribute: 'our_reference_company_has_user_id',
            form: company_attributes,
          }}
        />
        <Input attribute="reference" form={company_attributes} />
        <CheckBox attribute="active" form={company_attributes} />
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
export default CompanyForm;
