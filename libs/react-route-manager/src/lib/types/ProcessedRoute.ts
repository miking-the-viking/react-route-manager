/* eslint-disable @typescript-eslint/no-explicit-any */
import { Route } from '.';

export interface ProcessedRouteConfig<
  RouteManagerState extends Record<string, any> = Record<string, any>
> extends Route<RouteManagerState> {
  /**
   * Computed absolute path within the route object
   */
  absolutePath: string;

  children?: ProcessedRouteConfig<RouteManagerState>[];

  processedVariants?: ProcessedRouteConfig<RouteManagerState>[];
}
