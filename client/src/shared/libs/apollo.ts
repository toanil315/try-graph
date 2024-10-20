import { InMemoryCache, split } from '@apollo/client';
import { ApolloClient, from } from '@apollo/client';
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

const removeTypenameLink = removeTypenameFromVariables();
const baseLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  baseLink,
);

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: !import.meta.env.VITE_NODE_ENV,
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
  link: from([removeTypenameLink, splitLink]),
});
