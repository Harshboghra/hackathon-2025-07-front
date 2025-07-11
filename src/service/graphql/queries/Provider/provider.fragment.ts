import { gql } from '@apollo/client';

export const PROVIDER_FIELDS = gql`
  fragment ProviderFields on Provider {
    key
    name
    type
    active
    currentApiVersion
  }
`;

export const PROVIDER_FLOWS = gql`
  fragment ProviderFlows on ProviderFlow {
    key
    name
    parent
    hasCronFrequency
  }
`;

export const PROVIDER_EXTRA_FIELD_FORMAT = gql`
  fragment ProviderExtraFieldFormat on ExtraFieldFormate {
    key
    name
    type
    hint
    initialView
  }
`;

export const PROVIDER_FIELDS_LIGHT = gql`
  fragment ProviderFieldsWithId on Provider {
    key
  }
`;
