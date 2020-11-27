import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";

export const USERS_INDEX: RouteConfig<any> = {
  path: "/",
  lazyLoadedComponent: lazy(() => import("./UsersIndex")),
  description: "Main Users page",
  name: "Users",
};
