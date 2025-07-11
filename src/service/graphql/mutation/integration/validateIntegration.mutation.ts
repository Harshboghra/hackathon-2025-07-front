import { gql } from '@apollo/client';
import { IIntegration } from '../../../../pages/Integration/Integration.model';
import {
  DEFAULT_RESPONSE,
  handelMutationResponse,
  postMutation,
  sanitizeStringValues,
} from '../../../mutation.service';

export const mutateIntegration = (
  integrationData: IIntegration,
  type: string,
  responseAttribute?: string[],
) => {
  let newEnabledFlows = '';

  integrationData?.enabled_flows?.forEach((flow: any) => {
    newEnabledFlows += `{${sanitizeStringValues(flow)}},`;
  });

  if (newEnabledFlows.endsWith(',')) {
    newEnabledFlows = newEnabledFlows.slice(0, -1);
  }

  const { enabled_flows, ...rest } = integrationData;

  const transformedIntegrationData = `{
    ${sanitizeStringValues(rest)},
    enabled_flows: [${newEnabledFlows}]
  }`;

  const response = responseAttribute ? responseAttribute.join(', ') : '';

  const mutation = gql`
    mutation {
      ${type}Integration(
        ${type}IntegrationInput: ${transformedIntegrationData}
      ) {
        ${response}
        ${DEFAULT_RESPONSE}
    }
  `;

  const res = postMutation(mutation);
  return handelMutationResponse(res);
};
