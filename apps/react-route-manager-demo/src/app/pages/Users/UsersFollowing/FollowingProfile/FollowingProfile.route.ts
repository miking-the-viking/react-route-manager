import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { UserFollowingQuery } from "@react-route-manager/hooks-api";
import { RouterIcon } from "@react-route-manager/ui-components";
import { lazy } from "react";
import { AppRouteConfig } from "../../../../../router/route-manager.config";

type VariantsArgs = {
  following: UserFollowingQuery["followers"];
};

export const FOLLOWING_PROFILE = Symbol("FollowingProfile");

export const FOLLOWING_PROFILE_ROUTE: AppRouteConfig<VariantsArgs> = {
  key: FOLLOWING_PROFILE,
  path: "profile/:id",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./FollowingProfile")),
  description: "Following Profile",
  name: "Profiles",
  collections: ["nav"],
  variants: ({ following = [] }) => {
    return following.map((foll) => {
      const { email, id, name } = foll.following;
      return {
        key: FOLLOWING_PROFILE,
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
  variantFilter: (variants, { id }) =>
    variants.find((v) => v.path === `profile/${id}`),
};
