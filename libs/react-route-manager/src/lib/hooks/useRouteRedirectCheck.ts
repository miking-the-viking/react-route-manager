import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Route } from '../types/Route';
import { processRules } from '../utils/processRules';

/**
 * Convenience hook used to check a Route config against the current Router state,
 * redirecting if the rules fail.
 *
 * @param route
 */
export function useRouteRedirectCheck<
  RouterState extends Record<string, unknown> = any
>(route: Route<RouterState>) {
  const { state, allowedRouteBySymbol } = useRouteManagerContext();

  const navigate = useNavigate();

  useEffect(() => {
    const redirectRouteOrPath: string | symbol | null = processRules(
      state,
      route.rules
    );
    if (!redirectRouteOrPath) {
      return;
    }
    if (typeof redirectRouteOrPath === 'symbol') {
      const route = allowedRouteBySymbol(redirectRouteOrPath);

      if (!route) {
        console.log(
          'Did not resolve route as an allowed route, falling back to `/`. This could be a logic error in your ACL or route nesting.'
        );
        navigate('/');
        return;
      }
      navigate(route.absolutePath);
      return;
    }

    navigate(redirectRouteOrPath);
  }, [allowedRouteBySymbol, route.rules, state, navigate, route]);
}
