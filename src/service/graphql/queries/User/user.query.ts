import { gql } from '@apollo/client';
import {
  COMPANY_FIELDS,
  COMPANY_FIELDS_LIGHT,
} from '../Company/company.fragment';
import {
  COMPANY_HAS_USER_FIELDS,
  COMPANY_HAS_USER_FIELDS_LIGHT,
} from '../CompanyHasUser/companyHasUser.fragment';

import {
  USER_FIELDS,
  USER_FIELDS_LIGHT,
  USER_FIELDS_WITH_VALID_EMAILS,
} from './user.fragment';
import { COMPANY_HAS_USER_ROLE_FIELDS } from '../CompanyHasUserRole/companyHasUserRole.fragment';
import { ROLE_FIELDS } from '../Role/role.fragment';

export const GET_CURRENT_USER = gql`
  ${USER_FIELDS_WITH_VALID_EMAILS}
  ${COMPANY_HAS_USER_FIELDS}
  ${COMPANY_FIELDS}
  query getCurrentUser {
    getCurrentUser {
      ...UserFieldsWithValidEmails
      company_has_users {
        ...CompanyHasUserFields
        company {
          ...CompanyFields
        }
      }
    }
  }
`;

export const GET_All_USERS = gql`
  ${USER_FIELDS_LIGHT}
  ${COMPANY_HAS_USER_FIELDS_LIGHT}
  ${COMPANY_FIELDS_LIGHT}
  ${USER_FIELDS}
  query getAllUser($companyHasUserId: Float) {
    getCurrentUser {
      ...UserFieldsWithId
      company_has_users(id: $companyHasUserId) {
        ...CompanyHasUserFieldsWithId
        company {
          ...CompanyFieldsWithId
          user {
            ...UserFields
          }
        }
      }
    }
  }
`;

export const GET_USER_BY_ID = gql`
  ${USER_FIELDS}
  ${COMPANY_FIELDS}
  ${COMPANY_HAS_USER_FIELDS}
  ${COMPANY_HAS_USER_ROLE_FIELDS}
  ${ROLE_FIELDS}
  query getUsersById($id: Float!) {
    getUser(id: $id) {
      ...UserFields
      company_has_users {
        ...CompanyHasUserFields
        company {
          ...CompanyFields
        }
        company_has_user_roles {
          ...CompanyHasUserRoleFields
          role {
            ...RoleFields
          }
        }
      }
    }
  }
`;
