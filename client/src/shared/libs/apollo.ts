import { InMemoryCache } from '@apollo/client';
import { ApolloClient, from } from '@apollo/client';
import { HttpLink } from '@apollo/client/link/http';
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';

const removeTypenameLink = removeTypenameFromVariables();
const baseLink = new HttpLink({ uri: import.meta.env.VITE_API_URL });

export const apolloClient = new ApolloClient({
  cache: new InMemoryCache(),
  connectToDevTools: !import.meta.env.VITE_NODE_ENV,
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
  link: from([removeTypenameLink, baseLink]),
});
