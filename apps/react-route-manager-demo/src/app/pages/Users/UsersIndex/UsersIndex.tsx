import { Code, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import React from "react";
import { USERS } from "../Users.route";

const UsersIndex: React.FC = () => {
  return (
    <Grid>
      <GridItem>
        <Heading>Users Index</Heading>
        <Text fontSize="lg">
          This route <Code>/users/</Code> is the main Index route for Users
          <Code>/users</Code>.
        </Text>
      </GridItem>
    </Grid>
  );
};

export default RouterMetaWrap(USERS, UsersIndex);
