import { gql } from '@apollo/client';

export const ROLE_FIELDS = gql`
  fragment RoleFields on Role {
    id
    name
    description
    role_type_id
    parent_role_id
    created
  }
`;

export const ROLE_LIGHT_FIELDS = gql`
  fragment RoleLightFields on Role {
    id
  }
`;
