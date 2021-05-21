import { Button, Collapse, List, ListItem, Text } from '@chakra-ui/react';
import {
  faChevronDown,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProcessedRouteConfig } from '@react-route-manager/react-route-manager';
import { AppState } from '@react-route-manager/ui-state';
import React from 'react';
import { NavRoute } from './NavRoute';

export const NavRouteWithChildren: React.FC<{
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
        width={'100%'}
        display="flex"
        justifyContent={'space-between'}
        pr="0"
        border={'none'}
        boxShadow={'none !important'}
      >
        <FontAwesomeIcon
          size="lg"
          icon={open ? faChevronDown : faChevronRight}
        />
        <Text>{navItem.name}</Text>
      </Button>
      <Collapse in={open}>
        <List pl={'2'}>
          {navItem.children &&
            navItem.children.map((route) => {
              return (
                <NavRoute
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
