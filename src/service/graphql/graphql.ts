import fetch from 'cross-fetch';
import {
  ApolloClient,
  from,
  fromPromise,
  HttpLink,
  InMemoryCache,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import store from '../../state/store';
import { authService } from '../auth/auth.service';
import {
  setLoginDialogOpen,
  setAccessToken,
} from '../../state/auth/auth.reducer';
import config from '../../config/config';
import { GraphQLQueryFailPopUp, pushMessage } from '../../contexts/message';

const getNewToken = (refresh_token: string): Promise<string> => {
  return authService.refreshToken(refresh_token).then((response) => {
    // extract your accessToken from your response data and return it
    const { access_token } = response;
    return access_token;
  });
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    if (graphQLErrors) {
      for (let err of graphQLErrors) {
        switch (err.extensions.code) {
          case 'UNAUTHENTICATED': {
            //get refresh token from store
            const token = store.getState().auth.login.data?.refresh_token;
            return fromPromise(
              getNewToken(token!).catch(() => {
                // Handle token refresh errors e.g clear stored tokens, redirect to login
                store.dispatch(setLoginDialogOpen(true));
              }),
            )
              .filter((value) => Boolean(value))
              .flatMap((access_token) => {
                store.dispatch(setAccessToken(access_token as string));
                const oldHeaders = operation.getContext().headers;
                // modify the operation context with a new token
                operation.setContext({
                  headers: {
                    ...oldHeaders,
                    authorization: `Bearer ${access_token}`,
                  },
                });

                // retry the request, returning the new observable
                return forward(operation);
              });
          }
          case 'FORBIDDEN':
            pushMessage({
              message: [
                {
                  show: true,
                  type: 'error',
                  message: 'Forbidden to access the resource',
                },
              ],
            });
            break;
        }
      }

      const definitions: any = operation.query.definitions[0];
      if (definitions.operation !== 'mutation') {
        return new Observable((observer) => {
          const timer = setTimeout(() => {
            forward(operation).subscribe((res) => {
              if (res.errors) {
                GraphQLQueryFailPopUp(res.errors);
              }
              observer.next(res);
              observer.complete();
            });
          }, 1000); // Introduce a 1-second delay
          return () => {
            clearTimeout(timer);
          };
        });
      }
    }
    if (networkError) console.log(`[Network error]: ${networkError}`);
  },
);
const httpLink = new HttpLink({ uri: config.graphQlUrl, fetch });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = store.getState().auth.login.data?.access_token;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(from([errorLink, httpLink])),

  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

export const refetchQueries = () =>
  client.refetchQueries({
    include: 'active',
  });
