import { gql } from '@apollo/client';
import { INTEGRATION_HAS_FLOW_FIELDS } from './integrationHasFlow.fragment';

export const GET_All_INTEGRATION_HAS_FLOWS = gql`
  ${INTEGRATION_HAS_FLOW_FIELDS}
  query getAllIntegrationHasFlow {
    getAllIntegrationHasFlow {
      ...IntegrationHasFlowFields
    }
  }
`;
