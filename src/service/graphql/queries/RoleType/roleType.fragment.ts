import { gql } from '@apollo/client';

export const ROLE_TYPE_FIELDS = gql`
  fragment RoleTypeFields on RoleType {
    id
    name
    code
    description
    parent_role_type_id
    created
  }
`;

export const ROLE_TYPE_FIELDS_LIGHT = gql`
  fragment RoleTypeFieldsWithId on RoleType {
    id
  }
`;
