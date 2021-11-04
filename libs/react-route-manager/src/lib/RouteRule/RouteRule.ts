/* eslint-disable @typescript-eslint/ban-types */
import { RouteManagerState } from '../types';

type UnknownObject = Record<string, unknown>;

/**
 * The Route Manager will iteratively and recursively evaluated all Rules listed on a Route.
 * All rules must pass for a route to be evaluated as accessible.
 *
 * The state passed in is up to the implementing library based on the routes needs, but the values must be accessible in the context that the RouteManager gets initialized.
 *
 */
type RuleEvaluator<RouteManagerState extends UnknownObject> = (
  state: RouteManagerState
) => boolean;

type RuleGenerator<
  RouteManagerState extends UnknownObject,
  DynamicProps extends any
> = (dynamicReqs: DynamicProps) => RuleEvaluator<RouteManagerState>;

type AConstructorTypeOf<T> = new (...args: any[]) => T;

export function Ruler<T extends UnknownObject>(
  ctor: AConstructorTypeOf<StaticRouteRule<T>>
);
export function Ruler<T extends UnknownObject>(
  ctor: AConstructorTypeOf<DynamicRouteRule<T>>
);
export function Ruler<T extends UnknownObject>(ctor) {
  const instance = new ctor();

  if (!instance.rule) throw Error('Missing rule from RouteRule class');

  if (typeof instance.rule({}) === 'function') {
    return class extends ctor implements DynamicRouteRule<T, UnknownObject> {
      readonly rule = instance.rule as RuleGenerator<
        UnknownObject,
        UnknownObject
      >;
      readonly redirect = instance.redirect as symbol;
      static readonly ruleTuple = [instance.rule, instance.redirect] as [
        RuleGenerator<T, UnknownObject>,
        symbol
      ];
    } as typeof ctor;
  }

  return class extends ctor implements StaticRouteRule<T> {
    readonly rule = instance.rule as RuleEvaluator<T>;
    readonly redirect = instance.redirect as symbol;
    static readonly ruleTuple = [instance.rule, instance.redirect] as [
      RuleEvaluator<T>,
      symbol
    ];
    readonly ruleTuple = [instance.rule, instance.redirect] as [
      RuleEvaluator<T>,
      symbol
    ];
  } as typeof ctor;
}

/**
 * A StaticRouteRule can be either statically defined, or dynamically driven by route parameters in order to support rules for nested `:slug` routes.
 *
 * It is composed of two parts:
 *
 * 1. The Rule Function, or Rule Function Generator (if using route :slug in the rule)
 * 2. The Redirect - this can be an absolute string, or a Route Symbol
 */
export abstract class StaticRouteRule<RouteManagerState extends UnknownObject> {
  static readonly ruleTuple: [RuleEvaluator<UnknownObject>, symbol];
  public readonly ruleTuple: [RuleEvaluator<UnknownObject>, symbol];
  public readonly rule: RuleEvaluator<RouteManagerState>;
  public readonly redirect?: symbol;
}
/**
 * A DynamicRouteRule can be either statically defined, or dynamically driven by route parameters in order to support rules for nested `:slug` routes.
 *
 * It is composed of two parts:
 *
 * 1. The Rule Function Generator (using route :slug in the rule)
 * 2. The Redirect - this can be an absolute string, or a Route Symbol
 */
export abstract class DynamicRouteRule<
  RouteManagerState extends UnknownObject,
  DynamicProps extends UnknownObject = UnknownObject
> {
  static readonly ruleTuple: [
    RuleGenerator<UnknownObject, UnknownObject>,
    symbol
  ];
  public readonly rule: RuleGenerator<RouteManagerState, DynamicProps>;
  public readonly redirect?: symbol;
}
