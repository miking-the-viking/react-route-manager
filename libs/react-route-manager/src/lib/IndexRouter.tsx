import React, { Suspense } from "react";
import { Navigate, PartialRouteObject, useRoutes } from "react-router";
import { BrowserProvider } from "./BrowserProvider";
import { RouteConfig } from "./types/RouteConfig";
import { RouteManagerProviderProps } from "./types/RouteManagerProviderProps";

export const AsyncComponent: React.FC<Pick<
  RouteConfig<Record<string, unknown>>,
  "lazyLoadedComponent"
>> = ({ lazyLoadedComponent: Component, ...props }) => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Component {...props} />
    </Suspense>
  );
};

const generateRoutes = (
  routes: RouteConfig<Record<string, unknown>>[]
): PartialRouteObject[] => {
  return routes.map(
    ({ name, description, path, lazyLoadedComponent, children }) => ({
      element: <AsyncComponent lazyLoadedComponent={lazyLoadedComponent} />,
      children: children && generateRoutes(children),
      path,
    })
  );
};

const AppRouter: React.FC<{ routes: PartialRouteObject[] }> = ({ routes }) => {
  const Router = useRoutes(routes);
  return Router;
};

export const IndexRouter: React.FC<Pick<
  RouteManagerProviderProps<Record<string, unknown>>,
  "routes"
>> = ({ routes }) => {
  /**
   * Bad behaviour:
   *
   * Login, redirect from Auth0 back to non-existant page, default redirect is `/` which is Welcome and not accessible by authed users.
   *
   * `Welcome` is not returned from accessibleRoutes, so redirect needs to be computed from bare RouteConfig value as that is where the redirect will be evaluated.
   *
   * Alternatively, RouterMetaWrap may invoke an immedaite evaluation since it knows the route?
   *
   */

  const r = [
    ...generateRoutes(routes), // Todo: sensible fallback or computed "to" value?
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ];
  return <AppRouter routes={r} />;
};
