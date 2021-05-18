import {
  apolloClient,
  WebThemeProvider,
} from '@react-route-manager/ui-components';
import { GlobalStoreProviderFactory } from '@react-route-manager/ui-state';
import React from 'react';
import AppRouter from './router/AppRouter';

const GlobalStoreProvider = GlobalStoreProviderFactory(apolloClient);

const App: React.FC = () => (
  <WebThemeProvider>
    <GlobalStoreProvider>
      <AppRouter />
    </GlobalStoreProvider>
  </WebThemeProvider>
);
export default App;
