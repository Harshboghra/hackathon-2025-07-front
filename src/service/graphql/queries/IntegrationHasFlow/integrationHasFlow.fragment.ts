import { gql } from '@apollo/client';

export const INTEGRATION_HAS_FLOW_FIELDS = gql`
  fragment IntegrationHasFlowFields on IntegrationHasFlow {
    id
    created_by_company_has_user_id
    created
    integration_id
    flow_key
    flow_extra_field
    cron_frequancy_in_minutes
    active
  }
`;

export const INTEGRATION_HAS_FLOW_FIELDS_LIGHT = gql`
  fragment IntegrationHasFlowFieldsWithId on IntegrationHasFlow {
    id
    flow_key
    cron_frequancy_in_minutes
    flow_extra_field
    active
  }
`;
