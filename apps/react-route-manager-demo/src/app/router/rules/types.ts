import {
  Route,
  RouteRule,
  RouteRuleEvaluator,
} from '@react-route-manager/react-route-manager';
import { RouterState } from '../Router.state';

/**
 * Convenience type to have a generic type-safe RouteRule without the repetition of the generic
 */
export type AppRouteRule = RouteRule<RouterState>;

/**
 * Convenience type to have a generic type-safe RouteRuleEvaluator without the repetition of the generic
 */
export type AppRouteRuleEvaluator = RouteRuleEvaluator<RouterState>;

export type AppRoute = Route<RouterState>;
