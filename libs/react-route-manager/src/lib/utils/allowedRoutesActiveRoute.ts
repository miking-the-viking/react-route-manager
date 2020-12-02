import { ProcessedRouteConfig } from "../types";
export const allowedRoutesActiveRoute = <Ri extends Record<string, unknown>>(
  routes: ProcessedRouteConfig<Ri>[],
  path: string,
  parentPath = ""
) => {
  console.log(
    `allowedRoutesActiveRoute checking ${path} against ${parentPath}`,
    routes
  );

  if (!routes || routes.length === 0) {
    return null;
  }

  const result = routes.reduce((acc, route) => {
    const relativeRoute = `${parentPath}${route.path}`;
    console.log(relativeRoute);
    if (route.absolutePath === path || `${route.absolutePath}/` === path) {
      // perfect match
      return route;
    }
    // check subroutes, if exist
    return route.children && Object.keys(route.children).length > 0
      ? allowedRoutesActiveRoute<Ri>(route.children, path) || acc
      : acc;
  }, {});

  if (!result || Object.keys(result).length === 0) return null;
  return result;
};
