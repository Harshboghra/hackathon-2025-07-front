import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { MessageContext } from '../../../contexts/message';
import PermissionForm from './_permissionForm';
import { useLazyQuery, useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import { GET_ROLE_BY_ID } from '../../../service/graphql/queries/Role/role.query';
import { mutateSetRoleHasPermission } from '../../../service/graphql/mutation/RoleHasPermission/roleHasPermission.mutation';
import { GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS } from '../../../service/graphql/queries';
import { updateAbility } from '../../../library/ability/ability';
import { MenuModal } from '../../../types/layout';
import { getMenuBasedPermission } from '../../../library/utilities/menuGenerators';
import { setRoleBaseMenu } from '../../../state/auth/auth.reducer';
import { useAppDispatch } from '../../../state/app.hooks';

const PermissionUpdate = () => {
  const params = useParams();
  const { data: roleData, refetch: roleRefetch } = useQuery(GET_ROLE_BY_ID, {
    variables: { roleId: Number(params?.id) },
    skip: !Number(params?.id),
  });
  const [getRoleAndPermissions] = useLazyQuery(
    GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS,
  );

  const dispatch = useAppDispatch();

  const { pushMessageFromMutationResponse } = useContext(MessageContext);
  const methods = useForm();
  const onSubmit = (values: number[]) => {
    mutateSetRoleHasPermission(Number(params?.id), values).then((res) => {
      pushMessageFromMutationResponse(res.response);
      if (res.response.status) {
        roleRefetch();
        getRoleAndPermissions().then((permissions) => {
          updateAbility(permissions.data.getRoleAndPermissions);
          const menu: MenuModal[] = getMenuBasedPermission();
          dispatch(setRoleBaseMenu(menu));
        });
      }
    });
  };

  return (
    <PermissionForm
      methods={methods}
      onSubmit={onSubmit}
      permissionData={roleData}
    />
  );
};
export default PermissionUpdate;
