/* eslint-disable @typescript-eslint/no-explicit-any */
import { faBlind, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { lazy } from 'react';
import { generatePath } from 'react-router';
import { RouterMetaWrap } from '../RouterMetaWrap';
import { ProcessedRouteConfig } from './ProcessedRoute';
import { RouteRule, RouteRuleGen } from './RouteRule';
import flatten from 'lodash/flatten';
import { RuleGenerator } from './RouteRuleEvaluator';



/**
 * A dynamic route has defined slugs which have matching keys in the params object.
 * 
 * For each key, "key" in the params object for a route, a corresponding ":key" must be present in the `path` string
 */
 export type DynamicParam<S extends string> = `:${S}`


 /**
  * A route can support additional strings, divided by '/' around the dynamic parameter slug.
  */
export type DynamicParamRoute<T extends string> = (
    T extends any
    ? ( x: `${string}/${DynamicParam<T>}/${string}` | `${DynamicParam<T>}/${string}` | `${string}/${DynamicParam<T>}` | `${DynamicParam<T>}`) => void
    : never
) extends ((x: infer I) => void)
    ? I
    : never;
  

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
  rules?: (RouteRule<RouterState> | RouteRuleGen<RouterState, any>)[];

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
  // variants?: (state: RouterState) => ProcessedRouteConfig<RouterState>[];

  dynamicRoutes?: (
    state: RouterState
  ) => {
    params: Record<string, string>;
    name: string;
  }[];
};

// type ParamsKeys<
//   K extends (
//     state: any
//   ) => {
//     params: Record<string, string>;
//     name: string;
//   }[]
// > = keyof ReturnType<K>[number]['params'] extends string ?  keyof ReturnType<K>[number]['params'] : never;

/**
 * React Route Manager
 * 
 * @todo reduce Route and DynamicRoute to a single function (just lazy to do more typings at the moment)
 */
export const RRM = {
  /**
   * A Route that does not contain any dynamic slugs, may still be a descendant of a dynamic slug route.
   */
  Route: <RouterState extends Record<string, any>>(routeProps: RouteConfigInput<RouterState> & {dynamicRoutes?: undefined; path: string;}) => new Route(routeProps),
  /**
   * A Route that contains one or more dynamic slugs `:slug` in the path.
   * 
   * - populate the `dynamicRoutes` key with a RouteRule to produce what are the valid slugs for the application in its given state
   * - populate the `children` with any child routes
   */
  DynamicRoute: <
    RouterState extends Record<string, any>,
    ParamKeys extends string
  >({
    path,
    dynamicRoutes,
    // rules,
    ...rest
  }: {
    path: DynamicParamRoute<ParamKeys>;
    dynamicRoutes: (
      state: RouterState
    ) => { name: string; params: Record<ParamKeys, string> }[];
    // rules: RouteRule<RouterState>[];
  } & RouteConfigInput<RouterState>) => {
    return new Route({
      ...rest,
      path,
      dynamicRoutes,
    });
  },
} as const;

export class Route<
  RouterState extends Record<string, any> = Record<string, any>
> {
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
  public variants?: (state: RouterState) => Route<RouterState>[];
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
    importComponent: componentImportFunction,
    icon,
    absolutePath,
    dynamicRoutes,
  }: RouteConfigInput<RouterState>) {
    this.key = key;
    this.path = path;
    this.name = name;
    this.description = description;
    this.collections = collections;
    this.rules = rules as RouteRule<RouterState>[] | undefined;
    // this.rules = rules?.filter((r) => typeof (r[0] instanceof Array ? r[0][0]: r[0] ) !== 'function') as RouteRule<RouterState>[] | undefined;
    this.children = children;
    this.absolutePath = absolutePath;

    this.icon = icon
      ? () => <FontAwesomeIcon size="lg" icon={icon} />
      : () => <FontAwesomeIcon size="lg" icon={faBlind} />;

    this.lazyLoadedComponent = lazy(async () => {
      const Component = await componentImportFunction();
      return {
        default: RouterMetaWrap(this, Component.default),
      };
    });

    // TODO: variants should yield unique Routes that have distinct absolutePath
    // generate from dynamicRoutes
    if (dynamicRoutes) {
      this.variants = (state) => {
        const config = dynamicRoutes(state);

        const dynamicVariants = config.map((dynamicConfig) => {
          const { params, ...routeParams } = dynamicConfig;
          const dynamicPath = generatePath(path, dynamicConfig.params);
          return new Route({
            key,
            path: dynamicPath,
            absolutePath: dynamicPath,
            importComponent: componentImportFunction,
            description: '',
            rules: rules,
            // children: undefined,
            children: children ? children.map((c) => 
            {
              const childPath = dynamicPath + '/' + c.path
              return {
                ...c,
                path: childPath,
                absolutePath: childPath,
                rules: c.rules ? c.rules.map((cRule) => {
                  //  TODO: handle array of rules, cRule[0][n]
                  if (typeof cRule[0] === 'function' && typeof cRule[0]({} as any) === 'function') {
                    const standAloneDynamicRules = cRule as any as RouteRuleGen<RouterState, any>

                    const standAloneDynamicRule = standAloneDynamicRules[0] as RuleGenerator<RouterState, any>
                    const rule: RouteRule<RouterState> = [standAloneDynamicRule(params), cRule[1]]
                    return rule
                  }
                  return cRule
                }).filter((rule) => rule !== undefined) : []
              }
            }) : undefined,
            ...routeParams,
          });
        });

        return dynamicVariants;
      };
    }

    if (this.variants) {
      this.variantFilter = (variants, params: Record<string, string>) => {
        const matchedVariant = variants.find((v) => {
          try {
            const generatedPath = generatePath(path, params);
            const matchesPath = v.path === generatedPath;
            return matchesPath;
          } catch (e) {
            return null
          }
        });

        return matchedVariant;
      };
    }
  }
}
