import { gql } from '@apollo/client';

export const ROLE_HAS_PERMISSION_FIELDS = gql`
  fragment RoleHasPermissionFields on RoleHasPermission {
    id
    role_id
    permission_id
    created
  }
`;
export const ROLE_HAS_PERMISSION_LIGHT_FIELDS = gql`
  fragment RoleHasPermissionLightFields on RoleHasPermission {
    id
  }
`;
