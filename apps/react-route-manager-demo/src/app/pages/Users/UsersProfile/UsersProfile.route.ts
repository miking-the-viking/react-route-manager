import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";

export const USERS_PROFILE: RouteConfig = {
  path: "profile",
  lazyLoadedComponent: lazy(() => import("./UsersProfile")),
  description: "Users Profile",
  name: "Users Profile",
  collections: ["nav"],
};
