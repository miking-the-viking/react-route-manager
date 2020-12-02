import {
  apolloClient,
  AuthProvider,
  WebThemeProvider,
} from "@react-route-manager/ui-components";
import { GlobalStoreProviderFactory } from "@react-route-manager/ui-state";
import React from "react";
import Router from "../router/Router";

const GlobalStoreProvider = GlobalStoreProviderFactory(apolloClient);

const App: React.FC = () => (
  <WebThemeProvider>
    <GlobalStoreProvider>
      <Router />
    </GlobalStoreProvider>
  </WebThemeProvider>
);
export default App;
