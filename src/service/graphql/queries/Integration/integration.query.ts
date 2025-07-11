import { gql } from '@apollo/client';
import { INTEGRATION_FIELDS } from './integration.fragment';
import { INTEGRATION_HAS_FLOW_FIELDS_LIGHT } from '../IntegrationHasFlow/integrationHasFlow.fragment';
import { COMPANY_FIELDS } from '../Company/company.fragment';

export const GET_All_INTEGRATIONS = gql`
  ${INTEGRATION_FIELDS}
  ${INTEGRATION_HAS_FLOW_FIELDS_LIGHT}
  ${COMPANY_FIELDS}
  query getAllIntegration {
    getAllIntegration {
      ...IntegrationFields
      integration_has_flows {
        ...IntegrationHasFlowFieldsWithId
      }
      company {
        ...CompanyFields
      }
    }
  }
`;
