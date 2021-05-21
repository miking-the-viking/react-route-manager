import { ProcessedRouteConfig, RouteConfig } from './RouteConfig';

export interface RouteManagerState<
  RouterState extends Record<string, unknown>
> {
  routes: RouteConfig<RouterState>[];
  allowedRoutes: ProcessedRouteConfig<RouterState>[];
  state: RouterState;
  setVariantState: (key: keyof RouterState, value: unknown) => void;
  activeRoute: string | null;
  /**
   * Resolves an allowed, processed route by it's route symbol and optional route parameters (as defined by the route's configuration)
   */
  allowedRouteBySymbol: (
    routeKey: symbol,
    params?: Record<string, unknown>
  ) => ProcessedRouteConfig<RouterState> | null;
}
