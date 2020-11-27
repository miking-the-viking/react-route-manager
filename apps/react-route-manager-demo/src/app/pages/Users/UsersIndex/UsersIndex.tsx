import { Box, Button, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { USERS } from "../Users.route";

const UsersIndex: React.FC = () => {
  return <p>UsersIndex</p>;
};

export default RouterMetaWrap(USERS, UsersIndex);
