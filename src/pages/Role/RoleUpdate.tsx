import { useLazyQuery } from '@apollo/client';
import { useState, useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MessageContext, setErrorsToForm } from '../../contexts/message';
import {
  mutateFromFormData,
  MUTATION_TYPE_UPDATE,
} from '../../service/mutation.service';
import { IRoleInitialValues, IUpdateRole } from './Role.model';
import { GET_All_ROLES } from '../../service/graphql/queries/Role/role.query';
import RoleForm from './_roleForm';

const RoleUpdate = (props: IUpdateRole) => {
  const { data, setRoleDialog, mainRoles } = props;
  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const [id, setId] = useState<number>(0);
  const [, { refetch }] = useLazyQuery(GET_All_ROLES);

  const initialValues: IRoleInitialValues = {
    name: data?.name,
    description: data?.description,
    role_type_id: data?.role_type_id,
    parent_role_id: data?.parent_role_id,
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

  const onSubmit = (values: any) => {
    const data = { ...values, id: id };
    mutateFromFormData(data, 'Role', MUTATION_TYPE_UPDATE).then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res.success) {
        refetch();
        if (setRoleDialog) {
          setRoleDialog(false);
        }
      } else {
        setErrorsToForm(res?.response, methods);
      }
    });
  };

  return (
    <RoleForm
      methods={methods}
      onSubmit={onSubmit}
      isEdit={true}
      mainRoles={mainRoles}
    />
  );
};

export default RoleUpdate;
