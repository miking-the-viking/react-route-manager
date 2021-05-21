import { ProcessedRouteConfig, RouteConfig } from './RouteConfig';

export interface RouteManagerState<i extends Record<string, unknown>> {
  routes: RouteConfig<i>[];
  allowedRoutes: ProcessedRouteConfig<i>[];
  state: i;
  setVariantState: (key: string, value: any) => void;
  activeRoute: string | null;
  /**
   * Resolves an allowed, processed route by it's route symbol and optional route parameters (as defined by the route's configuration)
   */
  allowedRouteBySymbol: (
    routeKey: symbol,
    params?: Record<string, unknown>
  ) => ProcessedRouteConfig<i> | null;
}
