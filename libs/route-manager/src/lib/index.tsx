import React, {
  useState,
  useMemo,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import {
  RouteManagerRouteConfig,
  EvaluatedRouteManagerRoute,
  RouteRule,
} from './types';
import { RouteManagerState } from './state';
import recursiveEvaluatedRoutes from './recursiveEvaluatedRoutes';
import { useLocation, useHistory } from 'react-router-dom';
import { processRules } from './processRouteThroughRules';

export type RouteManagerProviderType<R extends {}> = React.FC<
  RouteManagerState<R>
>;

export const RouteManagerContext = React.createContext<RouteManagerState<any>>({
  coreRoutes: [],
  evaluatedRoutes: [],
  setCoreRoutes: () => {
    /* */
  },
});

export const RouteManagerConsumer = RouteManagerContext.Consumer;

export const RouteManagerProviderFactory: <R>() => React.FC<{
  state: R;
  coreRoutes: RouteManagerRouteConfig<R>[];
}> = <Ri extends {}>() => {
  const dynamicProvider: React.FC<{
    state: Ri;
    coreRoutes: RouteManagerRouteConfig<Ri>[];
  }> = ({ children, state, coreRoutes }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [coreRouteState, setCoreRouteState] = useState<
      Pick<RouteManagerState<Ri>, 'coreRoutes'>
    >({
      coreRoutes,
    });

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const evaluatedRoutes = useMemo(() => {
      return recursiveEvaluatedRoutes(coreRouteState.coreRoutes, state);
    }, [coreRouteState, state]);

    const Context = RouteManagerContext as React.Context<RouteManagerState<Ri>>;

    return (
      <Context.Provider
        value={{
          coreRoutes: coreRouteState.coreRoutes,
          setCoreRoutes: (coreRoutes) => {
            setCoreRouteState({
              coreRoutes,
            });
          },
          evaluatedRoutes,
        }}
      >
        {children}
      </Context.Provider>
    );
  };
  return dynamicProvider;
};

export const useEvaluatedRoutesFromCollection = (collection: string) => {
  const { evaluatedRoutes } = useContext(RouteManagerContext);

  const evaluatedCollectionRoutes = useMemo(
    () =>
      evaluatedRoutes.filter(
        (route) =>
          route.collections && route.collections.indexOf(collection) >= 0
      ),
    [evaluatedRoutes, collection]
  );

  return evaluatedCollectionRoutes;
};

export const useRoutesFromCollection = (collection: string) => {
  const { coreRoutes } = useContext(RouteManagerContext);

  const collectionRoutes = useMemo(
    () =>
      coreRoutes.filter(
        (route) =>
          route.collections && route.collections.indexOf(collection) >= 0
      ),
    [coreRoutes, collection]
  );

  return collectionRoutes;
};

/**
 * Redirects to the fallback route if the state ever updates to a state where the rules for the route fails
 *
 * Behaviour is really redundant, but acts as a secondary layer if the implementation of the Route setup allows a user to navigate to a route
 *
 * @param state
 * @param fallback
 * @param rules
 */
export const useRouteFallback = <AppState extends {}>(
  state: AppState,
  fallback: string,
  rules: RouteRule<AppState>[]
) => {
  const { push } = useHistory();

  useEffect(() => {
    const redirect = !processRules(state, rules);
    if (redirect) {
      push(fallback);
    }
  }, [rules, push, fallback, state]);
};
