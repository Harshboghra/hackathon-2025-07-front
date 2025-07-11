import { useLazyQuery } from '@apollo/client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import {
  mutateFromFormData,
  MUTATION_TYPE_CREATE,
} from '../../service/mutation.service';
import { IUser, ICreateUser } from './User.model';
import UserForm from './_userForm';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import {
  GET_All_USERS,
  GET_COMPANY_WITH_USERS,
} from '../../service/graphql/queries';
import { UserContext } from '../../contexts/user';

const UserCreate = (props: ICreateUser) => {
  const { setUserDialog, companyId } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const { user } = useContext(UserContext);
  const [fetchAllUsers] = useLazyQuery(GET_All_USERS);
  const [fetchCompanyUsers] = useLazyQuery(GET_COMPANY_WITH_USERS);
  const methods = useForm({
    defaultValues: {
      first_name: '',
      last_name: '',
      email: '',
      active: false,
      role_id: null,
      phone: '',
      mobilephone: '',
    },
  });
  const onSubmit = (values: IUser) => {
    const userData = companyId ? { ...values, company_id: companyId } : values;
    const objectName = companyId ? 'User' : 'CompanyUser';
    mutateFromFormData(userData, objectName, MUTATION_TYPE_CREATE).then(
      (res) => {
        pushMessageFromMutationResponse(res?.response);
        if (res?.success) {
          setUserDialog(false);
          companyId
            ? fetchCompanyUsers({
                variables: {
                  id: companyId,
                },
              })
            : fetchAllUsers({
                variables: {
                  companyHasUserId: user?.companyHasUserId,
                },
              });

          methods.reset();
        } else {
          setErrorsToForm(res?.response, methods);
        }
      },
    );
  };
  return <UserForm methods={methods} onSubmit={onSubmit} />;
};
export default UserCreate;
