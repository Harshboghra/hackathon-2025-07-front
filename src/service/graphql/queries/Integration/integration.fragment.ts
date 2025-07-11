import { gql } from '@apollo/client';

export const INTEGRATION_FIELDS = gql`
  fragment IntegrationFields on Integration {
    id
    created_by_company_has_user_id
    created
    stock_manager_provider_key
    shop_manager_provider_key
    stock_manager_api_key
    shop_manager_api_key
    stock_manager_extra_field
    shop_manager_extra_field
    company_id
    active
    title
  }
`;

export const INTEGRATION_FIELDS_LIGHT = gql`
  fragment IntegrationFieldsWithId on Integration {
    id
  }
`;
