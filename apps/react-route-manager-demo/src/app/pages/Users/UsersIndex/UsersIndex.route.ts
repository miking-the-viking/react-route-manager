import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { REQUIRES_AUTH_LOGIN_REDIRECT } from "../../../../router/rules/RequiresAuth";
import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouterIcon } from "@react-route-manager/ui-components";

export const USERS_INDEX: RouteConfig = {
  path: "/",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./UsersIndex")),
  description: "Main Users page",
  name: "Users",
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ["nav"],
};
