import { gql } from '@apollo/client';
export const PAGE_FIELDS = gql`
  fragment PageFields on Page {
    id
    name
    code
    parent_page_id
    active
    sequence
  }
`;

export const PAGE_FIELDS_LIGHT = gql`
  fragment PageFieldsWithId on Page {
    id
  }
`;
