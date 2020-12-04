import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import React from "react";
import { Outlet } from "react-router";
import { USERS_FOLLOWING } from "./UsersFollowing.route";

const UsersFollowing: React.FC = () => {
  return (
    <>
      <p>Users Following Sub Router</p>
      <Outlet />
    </>
  );
};

export default RouterMetaWrap(USERS_FOLLOWING, UsersFollowing);
