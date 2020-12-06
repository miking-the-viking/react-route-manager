import { Code, Divider, Heading, Text } from "@chakra-ui/react";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import React from "react";
import { Outlet } from "react-router";
import { USERS } from "./Users.route";
import { UsersContextualWrapper } from "./UsersContext";

const Users: React.FC = () => {
  return (
    <>
      <Heading>Users</Heading>
      <Text fontSize="lg">
        This route <Code>/users</Code> is responsible for User-related pages.
        User Profile, and Following/Followers
      </Text>
      <Divider />
      <Outlet />
    </>
  );
};

export default RouterMetaWrap(USERS, Users, UsersContextualWrapper);
