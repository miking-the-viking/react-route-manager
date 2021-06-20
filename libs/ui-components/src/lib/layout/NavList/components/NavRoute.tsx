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
  if (navItem.processedVariants && navItem.processedVariants.length > 0) {
    // console.log('navItem has processedVariants', navItem);
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
  if (navItem.children && navItem.children.length > 0) {
    // if there are variants, we actually want to list the variants and have them list the NavRouteWithChildren
    // console.log('navItem has children: ', navItem);
    return (
      <NavRouteWithChildren
        handleDrawerClose={handleDrawerClose}
        navItem={navItem}
        key={navItem.path}
      />
    );
  }

  // console.log('fallback for navItem', navItem);
  return (
    <NavRouteBase
      handleDrawerClose={handleDrawerClose}
      navItem={navItem}
      key={navItem.path}
    />
  );
};
