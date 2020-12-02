/* eslint-disable react-hooks/rules-of-hooks */

import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IndexRouter } from "./IndexRouter";
import { RouteManagerContext } from "./RouteManagerContext";
import { RouteManagerProviderProps } from "./types/RouteManagerProviderProps";
import { RouteManagerState } from "./types/RouteManagerState";
import { allowedRoutesActiveRoute } from "./utils/allowedRoutesActiveRoute";
import { processRoutes } from "./utils/processRoutes";

/**
 *
 * RouteManagerProviderFactory is used to generate a typesafe, dynamic RouteManager Context Provider
 *
 * This generated component is responsible for automatically checking the route rules
 * and redirecting the user if they are accessing a non-valid route.
 *
 */
export const RouteManagerProviderFactory: <R extends Record<
  string,
  unknown
>>() => React.FC<RouteManagerProviderProps<R>> = <
  Ri extends Record<string, unknown>
>() => {
  const dynamicProvider: React.FC<RouteManagerProviderProps<Ri>> = ({
    Wrapper,
    state,
    routes: inputRoutes,
    // LoadingIndicator,
  }) => {
    const Context = RouteManagerContext as React.Context<RouteManagerState<Ri>>;
    const { pathname: path } = useLocation();
    const navigate = useNavigate();

    const [routeState, setRouteState] = useState<
      Pick<RouteManagerState<Ri>, "routes">
    >({
      routes: inputRoutes,
    });

    const router = (
      <IndexRouter
        // LoadingIndicator={LoadingIndicator}
        routes={inputRoutes}
      />
    );

    const allowedRoutes = useMemo(
      () => processRoutes<Ri>(routeState.routes, state),
      [routeState, state]
    );

    const activeRoute = useMemo(() => {
      if (!allowedRoutes || allowedRoutes.length === 0) return null;

      return allowedRoutesActiveRoute<Ri>(allowedRoutes, path);
    }, [allowedRoutes, path]);

    console.log("activeRoute = ", activeRoute);
    useEffect(() => {
      if (!activeRoute) {
        // there was no found activeRoute, this requires a redirect.
        console.log(`No active route computed for ${path} - should redirect`);
        navigate("/");
        // navigate(redirect());
      } else {
        console.log("Active route", activeRoute);
      }
    }, [activeRoute]);
    return (
      <Context.Provider
        value={{
          routes: routeState.routes,
          setRoutes: (coreRoutes) => {
            setRouteState({
              routes: coreRoutes,
            });
          },
          allowedRoutes,
          state,
          activeRoute,
        }}
      >
        {Wrapper ? <Wrapper>{router}</Wrapper> : { router }}
      </Context.Provider>
    );
  };
  return dynamicProvider;
};
