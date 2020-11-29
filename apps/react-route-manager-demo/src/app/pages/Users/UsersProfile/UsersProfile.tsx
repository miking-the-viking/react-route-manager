import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { USERS_PROFILE } from "./UsersProfile.route";

const UsersProfile: React.FC = () => {
  return <p>UsersProfile</p>;
};

export default RouterMetaWrap(USERS_PROFILE, UsersProfile);
