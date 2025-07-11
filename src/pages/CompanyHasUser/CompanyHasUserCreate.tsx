import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  mutateFromFormData,
  MUTATION_TYPE_CREATE,
} from '../../service/mutation.service';
import { ICompanyHasUser, ICreateCompanyHasUser } from './CompanyHasUser.model';
import CompanyHasUserForm from './_companyHasUserForm';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import { useLazyQuery } from '@apollo/client';
import { GET_USER_BY_ID } from '../../service/graphql/queries';

export const CompanyHasUserCreate = (props: ICreateCompanyHasUser) => {
  const { userId } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [getUser] = useLazyQuery(GET_USER_BY_ID);
  const methods = useForm({
    defaultValues: {
      company_id: null,
      active: false,
      role_id: null,
    },
  });
  const onSubmit = (values: ICompanyHasUser) => {
    const companyHasUserFormData = { ...values, user_id: userId };
    mutateFromFormData(
      companyHasUserFormData,
      'CompanyHasUser',
      MUTATION_TYPE_CREATE,
    ).then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res.success) {
        getUser({
          variables: {
            id: userId,
          },
        });
        methods.reset();
      } else {
        setErrorsToForm(res?.response, methods);
      }
    });
  };
  return <CompanyHasUserForm methods={methods} onSubmit={onSubmit} />;
};
