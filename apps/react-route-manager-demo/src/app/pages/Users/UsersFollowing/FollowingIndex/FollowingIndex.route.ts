import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouterIcon } from "@react-route-manager/ui-components";
import { REQUIRES_AUTH_LOGIN_REDIRECT } from "../../../../../router/rules/RequiresAuth";

export const FOLLOWING_INDEX: RouteConfig = {
  path: "/",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./FollowingIndex")),
  description: "Main Following page",
  name: "Following",
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ["nav"],
};
