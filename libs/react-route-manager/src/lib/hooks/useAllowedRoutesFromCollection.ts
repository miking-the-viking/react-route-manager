import { useMemo } from "react";
import { ProcessedRouteConfig } from "../types/RouteConfig";
import { useRouteManagerContext } from "./useRouteManagerContext";

/**
 * Convenience hook for retrieving all `evaluatedRoutes` for a given collection from the Route Manager Context
 */
export const useAllowedRoutesFromCollection = (
  collection: string
): ProcessedRouteConfig[] => {
  const { allowedRoutes } = useRouteManagerContext();
  const allowedCollectionRoutes = useMemo(
    () =>
      allowedRoutes.filter(
        (route) =>
          route.collections && route.collections.indexOf(collection) >= 0
      ),
    [allowedRoutes, collection]
  );

  return allowedCollectionRoutes;
};
