import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouteConfig } from "@react-route-manager/react-route-manager";
import { RouterIcon } from "@react-route-manager/ui-components";
import { lazy } from "react";
import { REQUIRES_AUTH_LOGIN_REDIRECT } from "../../../../router/rules/RequiresAuth";
import { FOLLOWING_FOLLOWABLE_USERS } from "./FollowingFollowableUsers/FollowingFollowableUsers.route";
import { FOLLOWING_INDEX } from "./FollowingIndex/FollowingIndex.route";
import { FOLLOWING_PROFILE } from "./FollowingProfile/FollowingProfile.route";

export const USERS_FOLLOWING: RouteConfig = {
  path: "following",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./UsersFollowing")),
  description: "Users I'm Following",
  name: "Users I'm Following",
  children: [FOLLOWING_INDEX, FOLLOWING_FOLLOWABLE_USERS, FOLLOWING_PROFILE],
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ["nav"],
};
