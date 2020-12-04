import { lazy } from "react";
import { faBlind } from "@fortawesome/free-solid-svg-icons";
import { RouterIcon } from "@react-route-manager/ui-components";
import { AppRouteConfig } from "../../../../../router/route-manager.config";
import { UserFollowingQuery } from "../../../../../../../../graphql/generated/hooks/types";

type VariantsArgs = {
  following: UserFollowingQuery["followers"];
};

export const FOLLOWING_PROFILE: AppRouteConfig<VariantsArgs> = {
  path: "profile/:id",
  icon: RouterIcon(faBlind),
  lazyLoadedComponent: lazy(() => import("./FollowingProfile")),
  description: "Users Profile",
  name: "Users Profile",
  collections: ["nav"],
  variants: ({ following = [] }) => {
    console.log("computing FollowingProfile variants with ", following);
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
