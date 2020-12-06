import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouterIcon } from "@react-route-manager/ui-components";

export const USERS_PROFILE: RouteConfig = {
  path: "profile",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./UsersProfile")),
  description: "My User Profile",
  name: "My Profile",
  collections: ["nav"],
};
