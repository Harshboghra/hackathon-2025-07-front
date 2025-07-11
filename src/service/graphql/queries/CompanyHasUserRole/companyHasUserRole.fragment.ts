import { gql } from '@apollo/client';

export const COMPANY_HAS_USER_ROLE_FIELDS = gql`
  fragment CompanyHasUserRoleFields on CompanyHasUserRole {
    id
    created_by_company_has_user_id
    company_has_user_id
    role_id
  }
`;

export const COMPANY_HAS_USER_ROLE_LIGHT_FIELDS = gql`
  fragment CompanyHasUserRoleLightFields on CompanyHasUserRole {
    id
  }
`;
