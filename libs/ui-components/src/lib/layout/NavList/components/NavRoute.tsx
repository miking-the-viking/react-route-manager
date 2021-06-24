import {
  ProcessedRouteConfig,
  useRouteManagerContext,
} from '@react-route-manager/react-route-manager';
import { AppState } from '@react-route-manager/ui-state';
import React from 'react';
import { NavRouteWithChildren } from './NavRouteWithChildren';
import { NavRouteWithDynamicViews } from './NavRouteWithDynamicViews';
import { NavRouteBase } from './NavRouteBase';
import { Children } from 'react';
import { processRules } from '../../../../../../react-route-manager/src/lib/utils/processRules';

export const NavRoute: React.FC<{
  navItem: ProcessedRouteConfig<AppState>;
  handleDrawerClose: () => void;
}> = ({ navItem, handleDrawerClose }) => {
  const { state } = useRouteManagerContext();
  if (navItem.processedVariants && navItem.processedVariants.length > 0) {
    console.log('navItem has processedVariants', navItem);

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
    console.log('navItem has children: ', navItem);

    // see if there are any children that are not passing a rule
    const accessibleChildren = navItem.children.filter(
      (child) => !processRules(state, child.rules)
    );

    console.log('accessibleChildren:', accessibleChildren);
    if (accessibleChildren.length > 0) {
      return (
        <NavRouteWithChildren
          handleDrawerClose={handleDrawerClose}
          navItem={{ ...navItem, children: accessibleChildren }}
          key={navItem.path}
        />
      );
    }
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
