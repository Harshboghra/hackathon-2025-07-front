import { gql } from '@apollo/client';
import {
  PROVIDER_EXTRA_FIELD_FORMAT,
  PROVIDER_FIELDS,
  PROVIDER_FLOWS,
} from './provider.fragment';

export const GET_All_PROVIDERS = gql`
  ${PROVIDER_FIELDS}
  ${PROVIDER_EXTRA_FIELD_FORMAT}
  ${PROVIDER_FLOWS}
  query getAllProviders {
    getAllProviders {
      ...ProviderFields
      extraFieldFormate {
        ...ProviderExtraFieldFormat
      }
      flow {
        ...ProviderFlows
        extraFieldFormate {
          ...ProviderExtraFieldFormat
        }
      }
    }
  }
`;

export const GET_All_FLOWS = gql`
  ${PROVIDER_FLOWS}
  query getAllProviderFlows {
    getAllProviderFlows {
      ...ProviderFlows
    }
  }
`;
