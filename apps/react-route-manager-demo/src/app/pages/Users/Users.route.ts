import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { USERS_INDEX } from "./UsersIndex/UsersIndex.route";
import { USERS_PROFILE } from "./UsersProfile/UsersProfile.route";

export const USERS: RouteConfig = {
  path: "users",
  lazyLoadedComponent: lazy(() => import("./Users")),
  description: "Users",
  name: "Users",
  children: [USERS_INDEX, USERS_PROFILE],
};
