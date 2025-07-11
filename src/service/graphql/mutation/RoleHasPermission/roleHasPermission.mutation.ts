import { gql } from '@apollo/client';
import {
  DEFAULT_RESPONSE,
  handelMutationResponse,
  postMutation,
} from '../../../mutation.service';

export const mutateSetRoleHasPermission = (
  roleId: number,
  permissionIds: number[],
) => {
  const input = `role_id:${roleId}, permission_ids:[${permissionIds}]`;
  const mutation = gql`
    mutation  {
      setRoleHasPermission(${input})
      { 
        status
        ${DEFAULT_RESPONSE}
      }
    `;

  const res = postMutation(mutation);
  return handelMutationResponse(res);
};
