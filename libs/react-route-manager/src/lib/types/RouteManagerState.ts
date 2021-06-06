import { ProcessedRouteConfig } from './ProcessedRoute';
import { Route } from './Route';

export interface RouteManagerState<
  RouterState extends Record<string, unknown>
> {
  routes: Route<RouterState>[];
  allowedRoutes: ProcessedRouteConfig<RouterState>[];
  state: RouterState;
  setVariantState: (
    key: keyof RouterState,
    value: RouterState[typeof key]
  ) => void;
  activeRoute:
    | ProcessedRouteConfig<RouterState>
    | {
        [key: string]: ProcessedRouteConfig<RouterState>;
      }
    | null;
  // activeRoute: string | null;
  /**
   * Resolves an allowed, processed route by it's route symbol and optional route parameters (as defined by the route's configuration)
   */
  allowedRouteBySymbol: (
    routeKey: symbol,
    params?: Record<string, unknown>
  ) => ProcessedRouteConfig<RouterState> | null;
}
