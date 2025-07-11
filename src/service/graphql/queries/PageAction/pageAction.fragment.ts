import { gql } from '@apollo/client';

export const PAGE_ACTION_FIELDS = gql`
  fragment PageActionFields on PageAction {
    id
    name
    code
    active
    sequence
  }
`;

export const PAGE_ACTION_FIELDS_LIGHT = gql`
  fragment PageActionFieldsWithId on PageAction {
    id
  }
`;
