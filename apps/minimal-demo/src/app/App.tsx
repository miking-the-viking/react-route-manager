import React from 'react';
import {
  AppLayout,
  WebThemeProvider,
} from '@react-route-manager/ui-components';
import { RouteManagerProviderFactory } from '@react-route-manager/react-route-manager';
import { routes } from './router/routes';
import { GlobalStoreProviderFactory } from '@react-route-manager/ui-state';

// Generate the Router component for use.
const Router = RouteManagerProviderFactory(routes);

/**
 * Barest minimal.
 *
 * No global state setup, no reusable layout/nav component or the RouterWrapper prop.
 *
 * Just raw routing
 */
// export const App = () => (
//   <WebThemeProvider>
//     <Router state={{}} />
//   </WebThemeProvider>
// );

/**
 *
 * Touch more functionality to the App, taking advantage of the opinionated implementation of React Route Manager.
 *
 * Can re-use and reapply the same dynamic route-driven components and state - Layout, Components, etc.
 *
 */
const GlobalStore = GlobalStoreProviderFactory();
export const App = () => (
  <WebThemeProvider>
    <GlobalStore>
      <Router
        state={{}}
        RouterWrapper={({ children }) => <AppLayout>{children}</AppLayout>}
      />
    </GlobalStore>
  </WebThemeProvider>
);

export default App;
