import { lazy } from "react";
import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouterIcon } from "@react-route-manager/ui-components";
import { AppRouteConfig } from "../../../../../router/route-manager.config";
import { UserFollowingQuery } from "@react-route-manager/hooks-api";

type VariantsArgs = {
  following: UserFollowingQuery["followers"];
};

export const FOLLOWING_PROFILE: AppRouteConfig<VariantsArgs> = {
  path: "profile/:id",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./FollowingProfile")),
  description: "Following Profile",
  name: "Profiles",
  collections: ["nav"],
  // If there is a variants function defined - CONSIDER THAT THE ONLY ROUTES FOR THIS PATH!
  variants: ({ following = [] }) => {
    return following.map((foll) => {
      const { email, id, name } = foll.following;
      return {
        absolutePath: `profile/${id}`,
        icon: RouterIcon(faBlind),
        collections: ["nav"],
        name: `${name ? name : email} User Profile`,
        description: `User profile for ${name ? name : email}`,
        lazyLoadedComponent: lazy(() => import("./FollowingProfile")), // todo remove the need for this
        path: `profile/${id}`,
      };
    });
  },
};
