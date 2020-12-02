import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { RouterIcon } from "@react-route-manager/ui-components";
import { lazy } from "react";
import { REQUIRES_GUEST_LOGIN_REDIRECT } from "../../../router/rules/RequiresGuest";

export const WELCOME: RouteConfig = {
  path: "/",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./Welcome")),
  description: "Main Welcome page for all visitors",
  name: "Welcome",
  rules: [REQUIRES_GUEST_LOGIN_REDIRECT],
};
