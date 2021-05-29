import { BrowserProvider } from '@react-route-manager/react-route-manager';
import { WebThemeProvider } from '@react-route-manager/ui-components';
import { GlobalStoreProviderFactory } from '@react-route-manager/ui-state';
import React from 'react';
import { AuthContext } from './contexts/AuthContext';
import Router from './router/Router';

const GlobalStoreProvider = GlobalStoreProviderFactory();

const App: React.FC = () => (
  <WebThemeProvider>
    <GlobalStoreProvider>
      <BrowserProvider>
        <AuthContext>
          <Router />
        </AuthContext>
      </BrowserProvider>
    </GlobalStoreProvider>
  </WebThemeProvider>
);
export default App;
