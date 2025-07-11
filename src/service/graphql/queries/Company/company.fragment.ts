import { gql } from '@apollo/client';

export const COMPANY_FIELDS = gql`
  fragment CompanyFields on Company {
    id
    name
    organization_number
    reference
    active
    created_by_company_has_user_id
    our_reference_company_has_user_id
    company_type_id
    created
    logo_file_id
  }
`;

export const COMPANY_FIELDS_LIGHT = gql`
  fragment CompanyFieldsWithId on Company {
    id
  }
`;
