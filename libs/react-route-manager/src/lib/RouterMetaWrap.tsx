import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router";
import {
  useAllowedRoutesFromCollection,
  useRouteManagerContext,
} from "./hooks";
import { RouteConfig } from "./types/RouteConfig";
import { processRules } from "./utils/processRoutes";

/**
 * 
 * 
 * @example 
 * 
 * ```
// Welcome.route.ts
// ===================================
export const WELCOME: RouteConfig = {
  path: "/",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./Welcome")),
  description: "Main Welcome page for all visitors",
  collections: ["guest"],
  name: "Welcome",
  rules: [REQUIRES_GUEST_LOGIN_REDIRECT],
};
// ===================================

// Welcome.tsx
// ===================================
import { WELCOME } from './welcome.route';

const Welcome: React.FC = () => {...};

// Wrap the component in `RouterMetaWrap` with its corresponding RouteConfig for automatic handling of name, description and (todo) favicon
// Haven't experienced any errors due to circular dependency /shrug

export default RouterMetaWrap(WELCOME, Welcome);
// ===================================
* ```
 * 
 * @param route 
 * @param Component 
 */
export const RouterMetaWrap = (
  route: RouteConfig<any>,
  Component: any
) => () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { allowedRoutes, state, routes } = useRouteManagerContext();
  // console.log(state);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();
  const redirectPath: string | null = processRules(state, route.rules);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (redirectPath) {
      console.log(`RedirectPath:, ${redirectPath}`);
      navigate(redirectPath);
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>{route.name}</title>
        <meta
          name="description"
          content={route.description ?? "Some Badass Page"}
        />
      </Helmet>
      <Component />
    </>
  );
};
