import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { REQUIRES_GUEST_LOGIN_REDIRECT } from "../../../router/rules/RequiresGuest";

export const WELCOME: RouteConfig = {
  path: "/",
  lazyLoadedComponent: lazy(() => import("./Welcome")),
  description: "Main Welcome page for all visitors",
  name: "Welcome",
  rules: [REQUIRES_GUEST_LOGIN_REDIRECT],
};
