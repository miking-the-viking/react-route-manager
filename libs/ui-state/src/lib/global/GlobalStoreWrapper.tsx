import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

const GlobalStoreWrapper: React.FC = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export const GlobalStoreProviderFactory = () => ({ children }) => {
  return (
    <Provider store={store}>
      <GlobalStoreWrapper>{children}</GlobalStoreWrapper>
    </Provider>
  );
};

export default GlobalStoreProviderFactory;
