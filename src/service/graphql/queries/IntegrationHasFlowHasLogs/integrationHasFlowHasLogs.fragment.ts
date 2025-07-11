import { gql } from '@apollo/client';

export const INTEGRATION_HAS_FLOW_HAS_LOGS_FIELDS = gql`
  fragment IntegrationHasFlowHasLogsFields on IntegrationHasFlowHasLog {
    id
    created
    integration_has_flow_id
    message
    is_success
  }
`;

export const INTEGRATION_HAS_FLOW_HAS_LOGS_FIELDS_LIGHT = gql`
  fragment IntegrationHasFlowHasLogsFieldsWithId on IntegrationHasFlowHasLog {
    id
  }
`;
