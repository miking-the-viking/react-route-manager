import React from 'react';
import {
  AppLayout,
  WebThemeProvider,
} from '@react-route-manager/ui-components';
import { RouteManagerProviderFactory } from '@react-route-manager/react-route-manager';
import { routes } from './router/routes';
import { GlobalStoreProviderFactory } from '@react-route-manager/ui-state';
const Router = RouteManagerProviderFactory(routes);

/**
 * Can re-use and reapply the same dynamic route-driven components and state
 *
 */
const GlobalStore = GlobalStoreProviderFactory();
export const App = () => (
  <WebThemeProvider>
    <Router
      state={{}}
      RouterWrapper={({ children }) => (
        <GlobalStore>
          <AppLayout>{children}</AppLayout>
        </GlobalStore>
      )}
    />
  </WebThemeProvider>
);

/**
 * Barest minimal
 */
// export const App = () => (
//   <WebThemeProvider>
//     <Router state={{}} />
//   </WebThemeProvider>
// );
export default App;
