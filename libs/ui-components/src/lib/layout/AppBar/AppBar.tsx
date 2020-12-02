import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { AppState, SetNavExpanded } from "@react-route-manager/ui-state";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
);

export const AppBar: React.FC = () => {
  const { expanded } = useSelector((state: AppState) => ({
    expanded: state.System.navExpanded,
  }));

  const dispatch = useDispatch();

  const handleDrawerOpen = useCallback(() => {
    dispatch(SetNavExpanded(true));
  }, [dispatch]);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Box
          display={{
            sm: "block",
            //   , md: 'none'
          }}
          cursor="pointer"
          onClick={handleDrawerOpen}
        >
          <svg
            fill="white"
            width="16px"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </Box>
        <Box ml={2}>
          <Heading as="h1" size="lg" ml="3">
            React Route Manager
          </Heading>
        </Box>
      </Flex>
    </Flex>
  );
};

export default AppBar;
