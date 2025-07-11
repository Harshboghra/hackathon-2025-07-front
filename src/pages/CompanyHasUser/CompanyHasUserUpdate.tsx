import { useLazyQuery } from '@apollo/client';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  mutateFromFormData,
  MUTATION_TYPE_UPDATE,
} from '../../service/mutation.service';
import {
  ICompanyHasUser,
  ICompanyHasUserInitialValues,
  IUpdateCompanyHasUser,
} from './CompanyHasUser.model';
import CompanyHasUserForm from './_companyHasUserForm';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import { GET_USER_BY_ID } from '../../service/graphql/queries';

const CompanyHasUserUpdate = (props: IUpdateCompanyHasUser) => {
  const { data, setCompanyHasUserDialog } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [id, setId] = useState<number>();
  const [fetchUserById] = useLazyQuery(GET_USER_BY_ID);
  const initialValues: ICompanyHasUserInitialValues = {
    company_id: data?.company?.id,
    email: data?.email,
    phone: data?.phone,
    mobilephone: data?.mobilephone,
    active: data?.active,
    role_id: data?.company_has_user_roles?.[0]?.role_id,
  };
  const methods = useForm({
    values: initialValues,
  });
  useEffect(() => {
    if (data) {
      setId(data.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onSubmit = (values: ICompanyHasUser) => {
    mutateFromFormData(
      { ...values, id: id },
      'CompanyHasUser',
      MUTATION_TYPE_UPDATE,
    ).then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res.success) {
        fetchUserById({
          variables: {
            id: data?.user_id,
          },
        });
        setCompanyHasUserDialog && setCompanyHasUserDialog(false);
      } else {
        setErrorsToForm(res?.response, methods);
      }
    });
  };

  return (
    <CompanyHasUserForm methods={methods} onSubmit={onSubmit} isEdit={true} />
  );
};

export default CompanyHasUserUpdate;
