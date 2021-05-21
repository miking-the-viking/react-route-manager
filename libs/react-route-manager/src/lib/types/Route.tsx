import React, { ComponentType, lazy } from 'react';
import { RouterMetaWrap } from '../RouterMetaWrap';
import { ProcessedRouteConfig, RouteConfig } from './RouteConfig';
import { RouteRule } from './RouteRule';
import { generatePath } from 'react-router-dom';

export type RouteConfigInput<T extends ComponentType<any>> = {
  /**
   * Distinct key for this route which can be used anywhere in the application as distinct identifier
   *
   * @example
   * ```
   * export const USERS_PROFILE = Symbol('UsersProfile');
   * ```
   */
  key: symbol;

  /**
   * Distinct URL path for this route.
   *
   *
   * @example
   * ```
   * export const USERS_PROFILE = Symbol('UsersProfile');
   * ```
   */

  path: string;
  name: string;
  description: string;
  collections?: string[];
  rules?: RouteRule<Record<string, unknown>>[];
  children?: RouteConfig<Record<string, unknown>, undefined>[];
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
  icon?: () => JSX.Element;
  absolutePath?: string;
  variants?: (
    state: unknown
  ) => ProcessedRouteConfig<Record<string, unknown>>[];
  variantFilter?: (
    variants: ProcessedRouteConfig<Record<string, unknown>>[],
    params?: Record<string, unknown>
  ) => ProcessedRouteConfig<Record<string, unknown>>;
};

export class RouteConfigg<T extends ComponentType<any>> implements RouteConfig {
  public key: symbol;
  public path: string;
  public absolutePath?: string;
  public name: string;
  public description: string;
  public collections?: string[];
  public rules?: RouteRule<Record<string, unknown>>[];
  public children?: RouteConfig<Record<string, unknown>, undefined>[];
  public lazyLoadedComponent: ReturnType<typeof lazy>;
  public icon: () => JSX.Element;
  public variants?: (
    state: unknown
  ) => ProcessedRouteConfig<Record<string, unknown>>[];
  public variantFilter?: (
    variants,
    params
  ) => ProcessedRouteConfig<Record<string, unknown>>;

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
  }: RouteConfigInput<T>) {
    this.key = key;
    this.path = path;
    this.name = name;
    this.description = description;
    this.collections = collections;
    this.rules = rules;
    this.children = children;
    this.lazyLoadedComponent = lazy(async () => {
      console.log('lazy evaluation');
      const Component = await componentImportPath();
      return {
        default: RouterMetaWrap(this, Component.default),
      };
    });
    this.icon = icon ?? (() => <p>icon default todo</p>);
    this.absolutePath = absolutePath;
    this.variants = variants;
    if (variants) {
      this.variantFilter = (variants, params: Record<string, string>) =>
        variants.find((v) => v.path === generatePath(path, params));
    }
  }
}
