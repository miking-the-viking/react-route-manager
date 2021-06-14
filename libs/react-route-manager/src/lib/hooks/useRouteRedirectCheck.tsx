import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { Route } from '../types/Route';

/**
 * Convenience hook used to check a Route config against the current Router state,
 * redirecting if the rules fail.
 *
 * @param route
 */
export function useRouteRedirectCheck<
  RouterState extends Record<string, unknown> = any
>(route: Route<RouterState>) {
  const {
    state,
    redirectCheck,
    allowedRouteBySymbol,
  } = useRouteManagerContext();

  const params = useParams();

  useEffect(() => {
    redirectCheck(route, params);
  }, [redirectCheck, params, route, state]);

  return allowedRouteBySymbol(route.key, params);
}
