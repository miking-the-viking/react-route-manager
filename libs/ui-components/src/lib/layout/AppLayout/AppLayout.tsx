import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Text,
} from "@chakra-ui/core";
import { AppState, SetNavExpanded } from "@react-route-manager/ui-state";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "../AppBar/AppBar";
import NavList from "../NavList/NavList";

interface AppLayoutProps {
  hideNav?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ hideNav, children }) => {
  const dispatch = useDispatch();
  const { navExpanded } = useSelector((state: AppState) => ({
    navExpanded: state.System.navExpanded,
  }));

  const onClose = () => {
    dispatch(SetNavExpanded(false));
  };

  const { logout } = useAuth0();

  return (
    <Box>
      {!hideNav && <AppBar />}
      {!hideNav && (
        <Drawer isOpen={navExpanded} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader
              borderBottomStyle={"solid"}
              borderBottomWidth={"1px"}
              borderBottomColor={"black.100"}
            >
              <Text as="h2" fontSize={"2xl"} textAlign="center">
                Hauthura
              </Text>
            </DrawerHeader>

            <DrawerBody mt={"1rem"}>
              <NavList handleDrawerClose={onClose} />
            </DrawerBody>

            <DrawerFooter>
              <Button
                variant="solid"
                variantColor="blue"
                w={"100%"}
                onClick={() => logout()}
              >
                Logout
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}

      <Box as="main" p={hideNav ? "0" : "4"}>
        {children}
      </Box>
    </Box>
  );
};

export default AppLayout;
