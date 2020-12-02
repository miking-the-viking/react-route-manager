import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import React from "react";
import { Outlet } from "react-router";
import { USERS } from "./Users.route";

const Users: React.FC = () => {
  return (
    <>
      <p>Users Route (`/users/`) Router</p>
      <Outlet />
    </>
  );
};

export default RouterMetaWrap(USERS, Users);
