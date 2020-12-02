import { Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { WELCOME } from "./Welcome.route";
import { useAuth0 } from "@auth0/auth0-react";

const Welcome: React.FC = () => {
  const { loginWithPopup } = useAuth0();

  return (
    <Flex justifyContent="space-between" flexDir="column" minH="100vh">
      <Box>
        <Box id="header" p="6">
          <Text fontSize="xl" fontWeight="bold">
            React Route Manager Demo App Welcome
          </Text>
        </Box>
        <Box id="content" background={"cornflowerblue"} p="0" m="0">
          <Box p="0" m="0" maxW="66%" minW="10rem">
            <Box px="6" py="6" color="white">
              <Button onClick={() => loginWithPopup()}>Login</Button>
              <br />
              <Link to={"/users"}>Try to access Users</Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
};

export default RouterMetaWrap(WELCOME, Welcome);
