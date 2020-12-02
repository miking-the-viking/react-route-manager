import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { REQUIRES_AUTH_LOGIN_REDIRECT } from "../../../../router/rules/RequiresAuth";

export const USERS_INDEX: RouteConfig = {
  path: "/",
  lazyLoadedComponent: lazy(() => import("./UsersIndex")),
  description: "Main Users page",
  name: "Users",
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ["nav"],
};
