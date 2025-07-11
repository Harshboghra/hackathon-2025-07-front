export interface IIntegrationHasFlowHasLogs {
  id: number;
  created: string;
  integration_has_flow_id: number;
  message: string;
  is_success: boolean;
  integration_has_flow: {
    flow_key: string;
  };
}
