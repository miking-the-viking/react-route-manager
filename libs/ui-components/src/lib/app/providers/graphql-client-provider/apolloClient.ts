import { ApolloClient, ApolloLink, InMemoryCache, split } from '@apollo/client';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = (createHttpLink({
  uri: 'http://localhost:4200/v1/graphql',
  //   fetch,
}) as any) as ApolloLink;

// Create a WebSocket link:
const wsLink = (new WebSocketLink({
  uri: `ws://localhost:4200/v1/graphql`,
  options: {
    reconnect: true,
  },
}) as any) as ApolloLink;

const authLink = (setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
}) as any) as ApolloLink;

// TODO: client.resetStore() when logging out

const link = split(
  // split based on operation type
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authLink.concat(httpLink)
);

export const ApolloClientFactory = () =>
  new ApolloClient({
    cache: new InMemoryCache(),
    link,
    connectToDevTools: true,
  });

export const apolloClient = ApolloClientFactory();
