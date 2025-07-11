import { gql } from '@apollo/client';

export const VALIDATE_LINK_BY_TOKEN = gql`
  query validateLinkByToken($token: String!, $type: String!) {
    validateLinkByToken(token: $token, type: $type)
  }
`;
