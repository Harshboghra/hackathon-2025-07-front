import { gql } from '@apollo/client';
import { ROLE_TYPE_FIELDS } from '../RoleType/roleType.fragment';

export const GET_All_ROLE_TYPES = gql`
  ${ROLE_TYPE_FIELDS}
  query getAllRoleType {
    getAllRoleType {
      ...RoleTypeFields
    }
  }
`;
