import { Box, Button, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { Link } from "react-router-dom";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { WELCOME } from "./Welcome.route";

const Welcome: React.FC = () => {
  return (
    <>
      <p>Welcome</p>
      <Link to={"/users"}>USERS</Link>
    </>
  );
};

export default RouterMetaWrap(WELCOME, Welcome);
