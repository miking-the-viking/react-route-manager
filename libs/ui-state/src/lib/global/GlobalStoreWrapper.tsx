import { ApolloClient } from '@apollo/client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

interface GlobalStoreWrapperProps {
  apolloClient: ApolloClient<any>;
}

const GlobalStoreWrapper: React.FC<GlobalStoreWrapperProps> = ({
  apolloClient,
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};

export const GlobalStoreProviderFactory = (client: ApolloClient<any>) => ({
  children,
}) => {
  return (
    <Provider store={store}>
      <GlobalStoreWrapper apolloClient={client}>{children}</GlobalStoreWrapper>
    </Provider>
  );
};

export default GlobalStoreProviderFactory;
