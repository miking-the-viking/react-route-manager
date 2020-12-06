import { Button, Collapse, List, ListItem, Text } from "@chakra-ui/react";
import {
  faChevronDown,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ProcessedRouteConfig,
  useAllowedRoutesFromCollection,
} from "@react-route-manager/react-route-manager";
import { AppState } from "@react-route-manager/ui-state";
import React, { useMemo } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const NestedNavListItem: React.FC<{
  handleDrawerClose: () => void;
  navItem: ProcessedRouteConfig<AppState>;
}> = ({ handleDrawerClose, navItem }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: any) => {
    setOpen(!open);
    e.stopPropagation();
  };

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
      <Collapse in={open}>
        <List pl={"2"}>
          {navItem.children &&
            navItem.children.map((route) => {
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

interface NestedProccessedVarientListItemProps {
  handleDrawerClose: () => void;
  navItem: ProcessedRouteConfig<AppState>;
}
const NestedProccessedVarientListItem: React.FC<NestedProccessedVarientListItemProps> = ({
  navItem,
  handleDrawerClose,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = (e: any) => {
    setOpen(!open);
    e.stopPropagation();
  };

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
      <Collapse in={open}>
        <List pl={"2"}>
          {navItem.processedVariants &&
            navItem.processedVariants.map((route) => {
              return (
                <ComputedNavRoute
                  key={`${route.name}${route.absolutePath}`}
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
  navItem: ProcessedRouteConfig<AppState>;
}> = ({ navItem, handleDrawerClose }) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const isActive = useMemo(() => pathname === navItem.path, [
    pathname,
    navItem.path,
  ]);

  return (
    <Link
      key={navItem.name}
      to={navItem.absolutePath}
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
        {/* {navItem.icon && <ListIcon title={navItem.name} icon={navItem.icon} />} */}

        <Text>{navItem.name}</Text>
      </ListItem>
    </Link>
  );
};

const ComputedNavRoute: React.FC<{
  navItem: ProcessedRouteConfig<AppState>;
  handleDrawerClose: () => void;
}> = ({ navItem, handleDrawerClose }) => {
  if (navItem.children && navItem.children.length > 0) {
    return (
      <NestedNavListItem
        handleDrawerClose={handleDrawerClose}
        navItem={navItem}
        key={navItem.path}
      />
    );
  }
  if (navItem.processedVariants && navItem.processedVariants.length > 0) {
    return (
      <NestedProccessedVarientListItem
        handleDrawerClose={handleDrawerClose}
        navItem={navItem}
      />
    );
  }
  if (navItem.variants) {
    // If the navItem has variants defined, but none are accessible, then the route with variants is not accessible.
    return null;
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
  const routes = useAllowedRoutesFromCollection("nav");
  return (
    <List className="navList" as="nav">
      {routes.map((navItem) => {
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
