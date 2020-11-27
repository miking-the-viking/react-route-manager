import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";

export const WELCOME: RouteConfig<any> = {
  path: "/",
  lazyLoadedComponent: lazy(() => import("./Welcome")),
  description: "Main Welcome page for all visitors",
  name: "Welcome",
};
