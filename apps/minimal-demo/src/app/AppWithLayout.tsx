import React from 'react';
import {
  AppLayout,
  WebThemeProvider,
} from '@react-route-manager/ui-components';
import { RouteManagerProviderFactory } from '@react-route-manager/react-route-manager';
import { routes } from './router/routes';
import { GlobalStoreProviderFactory } from '@react-route-manager/ui-state';

// Generate the Router component for use.
/**
 * Dynamic Stateful Router component
 *
 * React.FC<RouteManagerProviderProps<Record<string, any>>>
 */
const Router = RouteManagerProviderFactory(routes);

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
