import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { RouterIcon } from "@react-route-manager/ui-components";
import { lazy } from "react";
import { REQUIRES_AUTH_LOGIN_REDIRECT } from "../../../../router/rules/RequiresAuth";
import { FOLLOWING_FOLLOWABLE_USERS_ROUTE } from "./FollowingFollowableUsers/FollowingFollowableUsers.route";
import { FOLLOWING_INDEX_ROUTE } from "./FollowingIndex/FollowingIndex.route";
import { FOLLOWING_PROFILE_ROUTE } from "./FollowingProfile/FollowingProfile.route";

export const USERS_FOLLOWING = Symbol("UsersFollowing");

export const USERS_FOLLOWING_ROUTE: RouteConfig = {
  key: USERS_FOLLOWING,
  path: "following",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./UsersFollowing")),
  description: "Users I'm Following",
  name: "Users I'm Following",
  children: [
    FOLLOWING_INDEX_ROUTE,
    FOLLOWING_FOLLOWABLE_USERS_ROUTE,
    FOLLOWING_PROFILE_ROUTE,
  ],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ["nav"],
};
