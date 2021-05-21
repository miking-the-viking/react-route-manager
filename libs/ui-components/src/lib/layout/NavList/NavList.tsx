import { List } from '@chakra-ui/react';
import { useAllowedRoutesFromCollection } from '@react-route-manager/react-route-manager';
import React from 'react';
import { NavRoute } from './components/NavRoute';

interface NavListProps {
  handleDrawerClose: () => void;
}

export const NavList: React.FC<NavListProps> = ({ handleDrawerClose }) => {
  const routes = useAllowedRoutesFromCollection('nav');
  return (
    <List className="navList" as="nav">
      {routes.map((navItem) => {
        return (
          <NavRoute
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
