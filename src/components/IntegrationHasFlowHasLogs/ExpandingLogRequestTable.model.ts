export interface IExpandingLogRequestTableProps {
  logId: number;
}

export interface IDetailState {
  text: React.ReactNode;
  title: string;
}

export interface IIntegrationHasFlowHasLogHasRequest {
  id: number;
  created: string;
  integration_has_flow_has_log_id: number;
  request_url: string;
  request_type: string;
  request_parameters: string;
  request_header: string;
  response_body: string;
  response_code: number;
}
