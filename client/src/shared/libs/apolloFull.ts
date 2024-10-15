// @ts-nocheck
import type { FetchResult, Observable } from '@apollo/client';
import { ApolloClient, from } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { HttpLink } from '@apollo/client/link/http';
import { UNAUTHORIZED_MESSAGE } from '#/shared/constants/messages';
import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_RATE_LIMIT_UUID,
  LOCAL_STORAGE_WORKSPACE_ID,
} from '#/shared/constants/storage-key';
import { handleRefreshToken } from '#/shared/handlers/handleRefreshToken';
import { getLocalStorage, getRateLimitHash, getUUID, setLocalStorage } from '#/shared/utils/tools';
import { cache } from './cache';

const baseLink = new HttpLink({ uri: import.meta.env.VITE_BASE_URL });

const authLink = setContext((_, { headers }) => {
  const accessToken = getLocalStorage(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

  let rateLimitUUID: string | null = getLocalStorage(LOCAL_STORAGE_RATE_LIMIT_UUID);

  if (!rateLimitUUID) {
    rateLimitUUID = getUUID();
    setLocalStorage(LOCAL_STORAGE_RATE_LIMIT_UUID, rateLimitUUID);
  }

  const rateLimitHash = getRateLimitHash(rateLimitUUID);

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : '',
      ['x-device-token']: rateLimitHash,
    },
  };
});

const errorLink = onError(({ graphQLErrors, operation, forward, networkError, response }) => {
  if (!graphQLErrors) return;

  if (graphQLErrors[0].message === UNAUTHORIZED_MESSAGE) {
    return handleRefreshToken({
      forward,
      graphQLErrors,
      networkError,
      operation,
      response,
    }) as Observable<FetchResult>;
  }

  if (operation.operationName === 'refreshToken') return;
});

export const client = new ApolloClient({
  cache,
  connectToDevTools: !import.meta.env.VITE_NODE_ENV,
  defaultOptions: {
    watchQuery: {
      notifyOnNetworkStatusChange: true,
    },
  },
  link: from([errorLink, authLink.concat(baseLink)]),
});
