import React from 'react';
import { RouteManagerState } from './types/RouteManagerState';

export const RouteManagerContext = React.createContext<RouteManagerState<any>>({
  routes: [],
  allowedRoutes: [],
  activeRoute: null,
  setVariantState: () => {
    /** */
  },
  state: {},
  allowedRouteBySymbol: () => null,
});

export const RouteManagerConsumer = RouteManagerContext.Consumer;
