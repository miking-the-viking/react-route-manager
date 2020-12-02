import { ProcessedRouteConfig, RouteConfig } from "./RouteConfig";

export interface RouteManagerState<i extends Record<string, unknown>> {
  routes: RouteConfig<i>[];
  setRoutes: (coreRoute: RouteConfig<i>[]) => void;
  allowedRoutes: ProcessedRouteConfig<i>[];
  state: i;
  activeRoute: string | null;
}