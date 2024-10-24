import { InMemoryCache, split } from '@apollo/client';
import { ApolloClient, from } from '@apollo/client';
import { ErrorResponse, onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { createClient } from 'graphql-ws';

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:3000/graphql',
  }),
);

const baseLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  baseLink,
);

const removeTypenameLink = removeTypenameFromVariables();

const handleGraphError = (graphQLErrors: ErrorResponse['graphQLErrors'] = []) => {
  for (const err of graphQLErrors) {
    window.dispatchEvent(
      new CustomEvent('graphql-error', {
        detail: err.extensions?.originalError,
      }),
    );
  }
};

const errorLink = onError(({ graphQLErrors, operation, forward }) => {
  if (!graphQLErrors) return;
  handleGraphError(graphQLErrors);
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: !import.meta.env.VITE_NODE_ENV,
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
  link: from([removeTypenameLink, errorLink, splitLink]),
});
