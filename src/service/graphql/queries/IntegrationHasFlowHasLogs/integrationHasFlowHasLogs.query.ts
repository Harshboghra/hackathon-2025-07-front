import { gql } from '@apollo/client';
import { INTEGRATION_HAS_FLOW_HAS_LOGS_FIELDS } from './integrationHasFlowHasLogs.fragment';
import { INTEGRATION_HAS_FLOW_FIELDS } from '../IntegrationHasFlow/integrationHasFlow.fragment';

export const GET_All_INTEGRATION_HAS_FLOW_HAS_LOGS = gql`
  ${INTEGRATION_HAS_FLOW_HAS_LOGS_FIELDS}
  ${INTEGRATION_HAS_FLOW_FIELDS}
  query getAllIntegrationHasFlowHasLogs(
    $integrationId: Float!
    $flowKey: [String!]
  ) {
    getAllIntegrationHasFlowHasLogs(
      integration_id: $integrationId
      flow_key: $flowKey
    ) {
      ...IntegrationHasFlowHasLogsFields
      integration_has_flow {
        ...IntegrationHasFlowFields
      }
    }
  }
`;

// TODO: Create a proper fragment for this
export const GET_LATEST_FAILED_INTEGRATION_HAS_FLOW_HAS_LOGS = gql`
  query getLatestFailedIntegrationHasFlowHasLogs {
    getLatestFailedIntegrationHasFlowHasLogs {
      message
      created
      integration_has_flow {
        flow_key
        integration {
          title
          company {
            name
          }
        }
      }
    }
  }
`;
