import {
  // PageWrapper,
  RouteManagerProviderFactory,
  // RouteRule,
  // RouteRuleEvaluator,
} from "@react-route-manager/react-route-manager";

// ----------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------

// Can customize as needed, just make sure it is consistent across the configs below.
/**
 * Shape of the Application State that will be used for Route Rule evaluation
 */
export type RouterState = Record<string, unknown>;
// export type RouterState = AppState & { authenticated: boolean };

/**
 * Convenience type to have a generic type-safe RouteRule without the repetition of the generic
 */
// export type HauthuraRule = RouteRule<RouterState>;
/**
 * Convenience type to have a generic type-safe RouteRuleEvaluator without the repetition of the generic
 */
// export type HauthuraRuleEvaluator = RouteRuleEvaluator<RouterState>;

// ----------------------------------------------------------------------
// Variables
// ----------------------------------------------------------------------

/**
 * The PageWrapper is a convenience component for using the predefined route configuration defined in `PATH`
 * and automatically updating meta fields such as title and description.
 * 
 * ```
<PageWrapper config={PATH.ABOUT}>
...
</PageWrapper>

```
 */
// export const PageWrapper = PageWrapperFactory<RouterState>();

// /**
//  *
//  */
// export const HauthuraManagerContext = RouteManagerContext as React.Context<
//   RouteManagerState<RouterState>
// >;

/**
 * Application-specific, generically type-safe React Route Manager Context Provider
 *
 * To be used as the Router, or wrapper to the `RouteManagerIndexRouter`.
 */
export const RouteManagerProvider = RouteManagerProviderFactory<RouterState>();
