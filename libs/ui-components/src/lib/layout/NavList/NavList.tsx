import {
  Button,
  Collapse,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/core";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   EvaluatedRouteManagerRoute,
//   useEvaluatedRoutesFromCollection,
// } from '@react-route-manager/react-route-manager';
import { AppState } from "@react-route-manager/ui-state";
import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NestedNavListItem: React.FC<{
  handleDrawerClose: () => void;
  navItem: EvaluatedRouteManagerRoute<AppState>;
}> = ({ handleDrawerClose, navItem }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: any) => {
    setOpen(!open);
    e.stopPropagation();
  };

  // console.log('NestedNavListItem', navItem.subRoutes);

  return (
    <ListItem>
      <Button
        variant="ghost"
        onClick={handleClick}
        width={"100%"}
        display="flex"
        justifyContent={"space-between"}
        pr="0"
        border={"none"}
        boxShadow={"none !important"}
      >
        <FontAwesomeIcon
          size="lg"
          icon={open ? faChevronDown : faChevronRight}
        />
        <Text>{navItem.name}</Text>
      </Button>
      <Collapse isOpen={open}>
        <List pl={"2"}>
          {navItem.children &&
            navItem.children.map((route) => {
              // console.log(`NestedNavListItem: `, route);
              return (
                <ComputedNavRoute
                  key={`${route.name}${route.path}`}
                  navItem={route}
                  handleDrawerClose={handleDrawerClose}
                />
              );
            })}
        </List>
      </Collapse>
    </ListItem>
  );
};

const NoSubrouteNavListItem: React.FC<{
  handleDrawerClose: () => void;
  navItem: Partial<EvaluatedRouteManagerRoute<AppState>>;
}> = ({ navItem, handleDrawerClose }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isActive = useMemo(() => pathname === navItem.path, [
    pathname,
    navItem.path,
  ]);

  // TODO: Styling for thel ist item that is active

  return (
    <Link
      key={navItem.name}
      to={navItem.computedPath}
      onClick={(evt) => {
        handleDrawerClose();
        navigate(navItem.path);
      }}
      className={isActive ? "is-active" : ""}
    >
      <ListItem
        fontSize="lg"
        display={"flex"}
        justifyContent={"space-between"}
        my={"1rem"}
      >
        {navItem.icon && <ListIcon title={navItem.name} icon={navItem.icon} />}

        <Text>{navItem.name}</Text>
      </ListItem>
    </Link>
  );
};

const ComputedNavRoute: React.FC<{
  navItem: EvaluatedRouteManagerRoute<AppState>;
  handleDrawerClose: () => void;
}> = ({ navItem, handleDrawerClose }) => {
  // console.log(
  //   `ComputedNavRoute`,
  //   navItem.subRoutes ? Object.keys(navItem.subRoutes) : null
  // );
  if (navItem.children && navItem.children.length > 0) {
    // console.log(`${navItem.name} has subroutes and keys`);
    return (
      <NestedNavListItem
        handleDrawerClose={handleDrawerClose}
        navItem={navItem}
        key={navItem.path}
      />
    );
  }
  return (
    <NoSubrouteNavListItem
      handleDrawerClose={handleDrawerClose}
      navItem={navItem}
      key={navItem.path}
    />
  );
};

interface NavListProps {
  handleDrawerClose: () => void;
}

export const NavList: React.FC<NavListProps> = ({ handleDrawerClose }) => {
  const routes = useEvaluatedRoutesFromCollection("nav");
  return (
    <List className="navList" as="nav">
      {routes.map((navItem) => {
        // console.log('NavList:', navItem);
        return (
          <ComputedNavRoute
            key={navItem.name + navItem.path}
            navItem={navItem}
            handleDrawerClose={handleDrawerClose}
          />
        );
      })}
    </List>
  );
};

export default NavList;
