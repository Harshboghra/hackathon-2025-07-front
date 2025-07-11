import { gql } from '@apollo/client';
import { PAGE_FIELDS } from '../Page/page.fragment';
import { ROLE_TYPE_FIELDS } from '../RoleType/roleType.fragment';
import { PAGE_ACTION_FIELDS } from '../PageAction/pageAction.fragment';
import { ROLE_LIGHT_FIELDS } from '../Role/role.fragment';
import { ROLE_HAS_PERMISSION_LIGHT_FIELDS } from '../RoleHasPermission/RoleHasPermission.fragment';
import { PERMISSION_LIGHT_FIELDS } from '../Permission/permission.fragment';
import { COMPANY_HAS_USER_ROLE_LIGHT_FIELDS } from './companyHasUserRole.fragment';

export const GET_COMPANY_HAS_USER_ROLE_WITH_PERMISSIONS = gql`
  ${COMPANY_HAS_USER_ROLE_LIGHT_FIELDS}
  ${PAGE_FIELDS}
  ${ROLE_TYPE_FIELDS}
  ${PAGE_ACTION_FIELDS}
  ${ROLE_LIGHT_FIELDS}
  ${ROLE_HAS_PERMISSION_LIGHT_FIELDS}
  ${PERMISSION_LIGHT_FIELDS}
  query getRoleAndPermissions {
    getRoleAndPermissions {
      ...CompanyHasUserRoleLightFields
      role {
        ...RoleLightFields
        role_type {
          ...RoleTypeFields
        }
        role_has_permissions {
          ...RoleHasPermissionLightFields
          permission {
            ...PermissionLightFields
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
