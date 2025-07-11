import { useLazyQuery } from '@apollo/client';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import {
  mutateFromFormData,
  MUTATION_TYPE_CREATE,
} from '../../service/mutation.service';
import { ICreateRole, IRole } from './Role.model';
import RoleForm from './_roleForm';
import { GET_All_ROLES } from '../../service/graphql/queries/Role/role.query';

const RoleCreate = (props: ICreateRole) => {
  const { setRoleDialog, mainRoles } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [, { refetch }] = useLazyQuery(GET_All_ROLES);
  const methods = useForm({
    defaultValues: {
      name: '',
      description: '',
      role_type_id: null,
      parent_role_id: null,
    },
  });
  const onSubmit = (values: IRole) => {
    mutateFromFormData(values, 'Role', MUTATION_TYPE_CREATE).then((res) => {
      pushMessageFromMutationResponse(res?.response);
      if (res?.success) {
        setRoleDialog && setRoleDialog(false);
        refetch();
        methods.reset();
      } else {
        setErrorsToForm(res?.response, methods);
      }
    });
  };
  return (
    <RoleForm methods={methods} onSubmit={onSubmit} mainRoles={mainRoles} />
  );
};
export default RoleCreate;
