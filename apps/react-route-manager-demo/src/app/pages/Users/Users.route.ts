import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { USERS_INDEX } from "./UsersIndex/UsersIndex.route";
import { USERS_PROFILE } from "./UsersProfile/UsersProfile.route";
import { REQUIRES_AUTH_LOGIN_REDIRECT } from "../../../router/rules/RequiresAuth";
import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouterIcon } from "@react-route-manager/ui-components";

export const USERS: RouteConfig = {
  path: "users",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./Users")),
  description: "Users",
  name: "Users",
  children: [USERS_INDEX, USERS_PROFILE],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ["nav"],
};
