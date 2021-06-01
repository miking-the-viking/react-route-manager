/* eslint-disable @typescript-eslint/no-explicit-any */
import { faBlind, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import { generatePath } from 'react-router-dom';
import { RouterMetaWrap } from '../RouterMetaWrap';
import { ProcessedRouteConfig } from './ProcessedRoute';
import { RouteRule } from './RouteRule';

export type RouteConfigInput<RouterState extends Record<string, any>> = {
  /**
   * Distinct key for this route which can be used anywhere in the application as distinct identifier
   *
   * @example
   * ```
   * export const USERS_PROFILE = Symbol('UsersProfile');
   * ```
   *
   *
   * @todo Used in conjunction with `allowedRouteBySymbol` to immediately retrieve the absolute route for a given route by the rotue symbol and optional parameters
   */
  key: symbol;

  /**
   * The relative url path that router should match to
   *
   *
   * @example
   * ```
   * export const USERS_PROFILE = Symbol('UsersProfile');
   * ```
   */

  path: string;

  /**
   * The name of the route
   */
  name: string;

  /**
   * Description
   */
  description: string;

  /**
   * A string of collections that the route belongs to,
   * this is helpful if there are multuple navigation components in an application
   * that can return the same route for instance. For instance the main nav "home" and an admin's sub-nav
   *
   */
  collections?: string[];

  /**
   * Rules applied to a route to permit access to it,
   *
   * Defined as a tuple of
   *
   *   - RouteRule or RouteRule array
   *   - Fallback path
   *
   */
  rules?: RouteRule<RouterState>[];

  /**
   * Child routes
   */
  children?: Route<RouterState>[];
  /**
   * Function which imports the component.
   *
   * The function definition ensures that it is imported lazily
   *
   * @example
   * ```
   * // since the WELCOME.route is a sibling file of the Welcome.tsx component
   * importComponent: () => import('./Welcome'),
   * ```
   */
  importComponent: () => Promise<any>;

  /**
   * Optional icon component function for use in the UI
   */
  icon?: IconDefinition;

  /**
   * Absolute path of the route
   */
  absolutePath?: string;

  /**
   * Function that takes in a given state to compute an array of available absolute paths for a slug based route
   *
   * /followers/:id
   *   - /followers/1
   *   - /followers/2
   *   - /followers/10
   */
  variants?: (state: RouterState) => ProcessedRouteConfig<RouterState>[];
};

export class Route<RouterState extends Record<string, any>> {
  public key: symbol;
  public path: string;
  public absolutePath?: string;
  public name: string;
  public description: string;
  public collections?: string[];
  public rules?: RouteRule<RouterState>[];
  public children?: Route<RouterState>[];
  public lazyLoadedComponent: ReturnType<typeof lazy>;
  public icon: () => JSX.Element;
  public variants?: (state: RouterState) => ProcessedRouteConfig<RouterState>[];
  public variantFilter?: (
    variants,
    params
  ) => ProcessedRouteConfig<RouterState>;

  constructor({
    key,
    path,
    name,
    description,
    collections,
    rules,
    children,
    importComponent: componentImportPath,
    icon,
    absolutePath,
    variants,
  }: RouteConfigInput<RouterState>) {
    this.key = key;
    this.path = path;
    this.name = name;
    this.description = description;
    this.collections = collections;
    this.rules = rules;
    this.children = children;
    this.absolutePath = absolutePath;

    this.icon = icon
      ? () => <FontAwesomeIcon size="lg" icon={icon} />
      : () => <FontAwesomeIcon size="lg" icon={faBlind} />;

    this.lazyLoadedComponent = lazy(async () => {
      const Component = await componentImportPath();
      return {
        default: RouterMetaWrap(this, Component.default),
      };
    });

    this.variants = variants;

    if (variants) {
      this.variantFilter = (variants, params: Record<string, string>) =>
        variants.find((v) => v.path === generatePath(path, params));
    }
  }
}
