import { gql } from '@apollo/client';
import { ROLE_FIELDS } from './role.fragment';
import { ROLE_TYPE_FIELDS } from '../RoleType/roleType.fragment';
import { ROLE_HAS_PERMISSION_FIELDS } from '../RoleHasPermission/RoleHasPermission.fragment';
import { PERMISSION_FIELDS } from '../Permission/permission.fragment';
import { PAGE_FIELDS } from '../Page/page.fragment';
import { PAGE_ACTION_FIELDS } from '../PageAction/pageAction.fragment';

export const GET_All_ROLES = gql`
  ${ROLE_FIELDS}
  ${ROLE_TYPE_FIELDS}
  query getAllRole {
    getAllRole {
      ...RoleFields
      role_type {
        ...RoleTypeFields
      }
      parent_role {
        ...RoleFields
      }
    }
  }
`;

export const GET_ROLE_BY_ID = gql`
  ${ROLE_FIELDS}
  ${ROLE_HAS_PERMISSION_FIELDS}
  ${PERMISSION_FIELDS}
  ${PAGE_FIELDS}
  ${PAGE_ACTION_FIELDS}
  query getRoleById($roleId: Float!) {
    getRole(id: $roleId) {
      ...RoleFields
      role_has_permissions {
        ...RoleHasPermissionFields
        permission {
          ...PermissionFields
          page {
            ...PageFields
          }
          page_action {
            ...PageActionFields
          }
        }
      }
      parent_role {
        ...RoleFields
        role_has_permissions {
          ...RoleHasPermissionFields
          permission {
            ...PermissionFields
            page {
              ...PageFields
            }
            page_action {
              ...PageActionFields
            }
          }
        }
      }
    }
  }
`;
