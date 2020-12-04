import { lazy } from "react";
import { RouteConfig } from "@react-route-manager/react-route-manager";
// import { FOLLOWING_INDEX } from "./FollowingIndex/FollowingIndex.route";
// import { FOLLOWING_PROFILE } from "./FollowingProfile/FollowingProfile.route";
import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouterIcon } from "@react-route-manager/ui-components";
import { REQUIRES_AUTH_LOGIN_REDIRECT } from "../../../../router/rules/RequiresAuth";
import { FOLLOWING_INDEX } from "./FollowingIndex/FollowingIndex.route";
import { FOLLOWING_PROFILE } from "./FollowingProfile/FollowingProfile.route";

export const USERS_FOLLOWING: RouteConfig = {
  path: "following",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./UsersFollowing")),
  description: "Users I'm Following",
  name: "Following",
  children: [FOLLOWING_INDEX, FOLLOWING_PROFILE],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ["nav"],
};
