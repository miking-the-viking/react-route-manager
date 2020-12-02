import { RouteRule } from "@react-route-manager/react-route-manager";
import { AppState } from "@react-route-manager/ui-state";
import { AppRuleEvaluator } from "../../route-manager.config";

export const RequiresGuest: AppRuleEvaluator = ({ authenticated }) => {
  return !authenticated;
};

export const DEFAULT_AUTHENTICATED_PATH = "/users/";

export const REQUIRES_GUEST_LOGIN_REDIRECT: RouteRule<AppState> = [
  [RequiresGuest],
  DEFAULT_AUTHENTICATED_PATH,
];
