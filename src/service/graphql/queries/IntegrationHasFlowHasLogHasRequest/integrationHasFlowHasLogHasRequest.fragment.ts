import { gql } from '@apollo/client';

export const INTEGRATION_HAS_FLOW_HAS_LOG_HAS_REQUEST_FIELDS = gql`
    fragment IntegrationHasFlowHasLogHasRequestFields on IntegrationHasFlowHasLogHasRequest {
        id
        created
        integration_has_flow_has_log_id
        request_url
        request_type
        request_parameters
        request_header
        response_body
        response_code
    }
`;

export const INTEGRATION_HAS_FLOW_HAS_LOG_HAS_REQUEST_FIELDS_LIGHT = gql`
    fragment IntegrationHasFlowHasLogHasRequestFieldsWithId on IntegrationHasFlowHasLogHasRequest {
        id
    }
`;
