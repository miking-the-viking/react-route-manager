import {
  RouteManagerProviderFactory,
  RouteRule,
  RouteRuleEvaluator,
} from "@react-route-manager/react-route-manager";
import { AppState } from "@react-route-manager/ui-state";

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

// Can customize as needed, just make sure it is consistent across the configs below.
/**
 * Shape of the Application State that will be used for Route Rule evaluation
 */
export type RouterState = AppState & {
  authenticated: boolean;
};

/**
 * Convenience type to have a generic type-safe RouteRule without the repetition of the generic
 */
export type AppRule = RouteRule<RouterState>;
/**
 * Convenience type to have a generic type-safe RouteRuleEvaluator without the repetition of the generic
 */
export type AppRuleEvaluator = RouteRuleEvaluator<RouterState>;

// ----------------------------------------------------------------------
// Variables
// ----------------------------------------------------------------------

/**
 * Application-specific, generically type-safe React Route Manager Context Provider
 *
 * To be used as the Router, or wrapper to the `RouteManagerIndexRouter`.
 */
export const RouteManagerProvider = RouteManagerProviderFactory<RouterState>();
