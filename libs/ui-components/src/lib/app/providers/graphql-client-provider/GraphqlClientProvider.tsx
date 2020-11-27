import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { apolloClient } from './apolloClient';

export const GraphqlClientProvider: React.FC = ({ children }) => (
  <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
);

export default GraphqlClientProvider;
