/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Route,
  RouteRule,
  RouteRuleEvaluator,
} from '@react-route-manager/react-route-manager';
import { RouterState } from '../Router.state';

/**
 * Convenience type to have a generic type-safe RouteRule without the repetition of the generic
 */
export type AppRouteRule<T extends Record<string, any> = {}> = RouteRule<
  RouterState & T
>;

/**
 * Convenience type to have a generic type-safe RouteRuleEvaluator without the repetition of the generic
 */
export type AppRouteRuleEvaluator<
  T extends Record<string, any> = {}
> = RouteRuleEvaluator<RouterState & T>;

export type AppRoute<T extends Record<string, any> = {}> = Route<
  RouterState & T
>;
