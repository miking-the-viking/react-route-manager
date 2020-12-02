import { RouteConfig } from "@react-route-manager/react-route-manager";
import { AppState } from "@react-route-manager/ui-state";
import { lazy } from "react";
import { REQUIRES_GUEST_LOGIN_REDIRECT } from "../../../router/rules/RequiresGuest";

export const LOGIN: RouteConfig<AppState> = {
  path: "/login",
  lazyLoadedComponent: lazy(() => import("./Login")),
  name: "Login",
  rules: [REQUIRES_GUEST_LOGIN_REDIRECT],
  // collections: ['guest'],
  description: "Callback redirect destination from Auth0 on login",
};
