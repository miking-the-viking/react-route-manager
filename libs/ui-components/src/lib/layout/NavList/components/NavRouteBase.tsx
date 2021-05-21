import { ListIcon, ListItem, Text } from '@chakra-ui/react';
import { ProcessedRouteConfig } from '@react-route-manager/react-route-manager';
import { AppState } from '@react-route-manager/ui-state';
import React, { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const NavRouteBase: React.FC<{
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
      className={isActive ? 'is-active' : ''}
    >
      <ListItem
        fontSize="lg"
        display={'flex'}
        justifyContent={'space-between'}
        my={'1rem'}
      >
        {navItem.icon && <ListIcon title={navItem.name} icon={navItem.icon} />}

        <Text>{navItem.name}</Text>
      </ListItem>
    </Link>
  );
};
