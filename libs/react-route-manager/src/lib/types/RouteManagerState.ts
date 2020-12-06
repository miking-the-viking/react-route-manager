import { ProcessedRouteConfig, RouteConfig } from "./RouteConfig";

export interface RouteManagerState<i extends Record<string, unknown>> {
  routes: RouteConfig<i>[];
  setRoutes: (coreRoute: RouteConfig<i>[]) => void;
  allowedRoutes: ProcessedRouteConfig<i>[];
  state: i;
  setVariantState: (key: string, value: any) => void;
  activeRoute: string | null;
  routeBySymbol: (
    routeKey: symbol,
    params?: Record<string, unknown>
  ) => string | null;
}
