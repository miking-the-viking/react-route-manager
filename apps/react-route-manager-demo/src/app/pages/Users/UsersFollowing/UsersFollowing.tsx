import { Code, Divider, Heading, Text } from "@chakra-ui/react";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import React from "react";
import { Outlet } from "react-router";
import { USERS_FOLLOWING_ROUTE } from "./UsersFollowing.route";

const UsersFollowing: React.FC = () => {
  return (
    <>
      <Heading>Users</Heading>
      <Text fontSize="lg">
        This route <Code>/users/following</Code> is a sub-router responsible for
        pages concerning users that I am Following. User Profile, Following
        Management.
      </Text>
      <Divider />
      <Outlet />
    </>
  );
};

export default RouterMetaWrap(USERS_FOLLOWING_ROUTE, UsersFollowing);
