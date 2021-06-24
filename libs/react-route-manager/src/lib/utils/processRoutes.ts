import { Route, RouteRuleGen } from '../types';
import { ProcessedRouteConfig } from '../types/ProcessedRoute';
import { processRules } from './processRules';

/**
 * Processes the routes based off the current application state
 *
 * @param routes
 * @param state
 */
export const processRoutes = <StateType extends Record<string, unknown>>(
  routes: Route<StateType>[],
  state: StateType,
  parentPath,
  mapping = {}
): [
  Record<symbol, ProcessedRouteConfig<StateType>>,
  ProcessedRouteConfig<StateType>[]
] => {
  const processedRoutes = routes
    .filter((route) => !processRules(state, route.rules))
    .map((route) => {
      const baseAbsolutePath =
        parentPath + (route.path !== '/' ? route.path : '');

      const absolutePath =
        baseAbsolutePath +
        (baseAbsolutePath.lastIndexOf('/') === baseAbsolutePath.length - 1
          ? ''
          : '/');

      // TODO: parent path needs to be included in route creation or by using parent route object's absolute path
      const parentPrependedVariants = route.variants
        ? recursivelyPrependParentPathToVariantRoutes(
            route.variants(state) as any,
            parentPath
          )
        : [];

      // TODO: Brainstorm autoresolving the necessary parameters
      const processedVariants = parentPrependedVariants;

      console.log(`processing ${route.name} children with ${absolutePath}`);
      const [childrenMapping, processedChildren] = route.children
        ? processRoutes<StateType>(route.children, state, absolutePath)
        : [{}, undefined];
      console.log(processedChildren);

      const processedRoute = {
        ...route,
        absolutePath,
        children: processedChildren,
        processedVariants,
      };

      mapping[route.key] = processedRoute;
      mapping = { ...mapping, ...childrenMapping };

      return processedRoute;
    });

  return [mapping, processedRoutes];
};

/**
 *
 * Utility to move the responsibility of prepending the parent's path in the absolute path computation to for a route variant function to the React Route Manager
 *
 * @param variantsArray
 * @param parentPath
 */
const recursivelyPrependParentPathToVariantRoutes = (
  variantsArray: ProcessedRouteConfig['processedVariants'],
  parentPath: string
) =>
  variantsArray.map((r) => ({
    ...r,
    absolutePath: `${parentPath}${r.absolutePath}`,
  }));
