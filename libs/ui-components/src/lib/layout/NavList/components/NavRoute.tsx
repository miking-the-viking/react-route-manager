import { ProcessedRouteConfig } from '@react-route-manager/react-route-manager';
import { AppState } from '@react-route-manager/ui-state';
import React from 'react';
import { NavRouteWithChildren } from './NavRouteWithChildren';
import { NavRouteWithDynamicViews } from './NavRouteWithDynamicViews';
import { NavRouteBase } from './NavRouteBase';

export const NavRoute: React.FC<{
  navItem: ProcessedRouteConfig<AppState>;
  handleDrawerClose: () => void;
}> = ({ navItem, handleDrawerClose }) => {
  if (navItem.children && navItem.children.length > 0) {
    return (
      <NavRouteWithChildren
        handleDrawerClose={handleDrawerClose}
        navItem={navItem}
        key={navItem.path}
      />
    );
  }
  if (navItem.processedVariants && navItem.processedVariants.length > 0) {
    return (
      <NavRouteWithDynamicViews
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
    <NavRouteBase
      handleDrawerClose={handleDrawerClose}
      navItem={navItem}
      key={navItem.path}
    />
  );
};
