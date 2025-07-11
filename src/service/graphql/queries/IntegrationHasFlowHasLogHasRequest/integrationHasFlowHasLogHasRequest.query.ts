import { gql } from '@apollo/client';
import { INTEGRATION_HAS_FLOW_HAS_LOG_HAS_REQUEST_FIELDS } from './integrationHasFlowHasLogHasRequest.fragment';

export const GET_All_INTEGRATION_HAS_FLOW_HAS_LOG_HAS_REQUESTS = gql`
  ${INTEGRATION_HAS_FLOW_HAS_LOG_HAS_REQUEST_FIELDS}
  query getAllIntegrationHasFlowHasLogHasRequest(
    $integration_has_flow_has_log_id: Float!
  ) {
    getAllIntegrationHasFlowHasLogHasRequest(
      integration_has_flow_has_log_id: $integration_has_flow_has_log_id
    ) {
      ...IntegrationHasFlowHasLogHasRequestFields
    }
  }
`;
