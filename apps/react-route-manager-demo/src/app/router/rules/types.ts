import {
  RouteRule,
  RouteRuleEvaluator,
  RouteConfig,
} from '@react-route-manager/react-route-manager';
import { RouterState } from '../RouterState.type';

/**
 * Convenience type to have a generic type-safe RouteRule without the repetition of the generic
 */
export type AppRouteRule = RouteRule<RouterState>;

/**
 * Convenience type to have a generic type-safe RouteRuleEvaluator without the repetition of the generic
 */
export type AppRouteRuleEvaluator = RouteRuleEvaluator<RouterState>;

/**
 *
 */
export type AppRouteConfig<
  VariantState extends Record<string, unknown>
> = RouteConfig<RouterState, VariantState>;
