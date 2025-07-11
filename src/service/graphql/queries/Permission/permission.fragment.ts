import { gql } from '@apollo/client';

export const PERMISSION_LIGHT_FIELDS = gql`
  fragment PermissionLightFields on Permission {
    id
  }
`;

export const PERMISSION_FIELDS = gql`
  fragment PermissionFields on Permission {
    id
    page_id
    page_action_id
    parent_permission_id
    created
  }
`;
