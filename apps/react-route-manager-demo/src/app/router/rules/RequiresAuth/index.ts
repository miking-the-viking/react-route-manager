import { AppRouteRule, AppRouteRuleEvaluator } from '../types';

/**
 * Returns true if the user is deemed authenticated
 *
 * Based on the presence of `Auth` and `Auth.jwt` being truthy.
 *
 */
export const RequiresAuth: AppRouteRuleEvaluator = ({ authenticated }) =>
  authenticated;

/**
 * Default redirect path for a not-authenticated user
 */
export const DEFAULT_NOT_AUTHENTICATED_PATH = '/';

/**
 * Basic Requires Auth RedirectRule
 *
 */
export const REQUIRES_AUTH_LOGIN_REDIRECT: AppRouteRule = [
  [RequiresAuth],
  DEFAULT_NOT_AUTHENTICATED_PATH,
];
