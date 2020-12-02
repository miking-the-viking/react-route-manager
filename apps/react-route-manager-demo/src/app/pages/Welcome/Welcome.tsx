import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { WELCOME } from "./Welcome.route";
import { useAuth0 } from "@auth0/auth0-react";

const Welcome: React.FC = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <>
      <p>Welcome</p>
      <Button onClick={() => loginWithPopup()}>Login</Button>
      <Link to={"/users"}>USERS</Link>
    </>
  );
};

export default RouterMetaWrap(WELCOME, Welcome);
