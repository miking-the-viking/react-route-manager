import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { USERS } from "./Users.route";

const Users: React.FC = () => {
  return (
    <>
      <p>Users</p>
      <Link to={"profile"}>Profile</Link>
      <br />
      <Link to={""}>Index</Link>
      <br />
      <Link to={"/"}>Welcome</Link>
      <Outlet />
    </>
  );
};

export default RouterMetaWrap(USERS, Users);
