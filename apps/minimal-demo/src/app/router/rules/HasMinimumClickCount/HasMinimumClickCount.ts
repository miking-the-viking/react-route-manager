import {
  RouteRule,
  RuleGenerator,
} from '@react-route-manager/react-route-manager';
import { GAME } from '../../../pages/Game/Game.symbol';
import { ClicksState } from '../shared/ClicksState';

export const HasMinimumClickCountGenerator: RuleGenerator<
  ClicksState,
  number
> = (count = 1) => ({ clicks }) => {
  return !!clicks && clicks >= count;
};

export const REQUIRES_MINIMUM_CLICKS_REDIRECT_GENERATOR: (
  count?: number,
  redirect?: symbol | string
) => RouteRule<ClicksState> = (count = 1, redirect = GAME) => [
  [HasMinimumClickCountGenerator(count)],
  redirect, // NOTE: Can use the route symbol instead of a hardcoded redirect path!
  // '/game' // Hardcoded strings also work, but are not recommended.
  // TODO: dynamic fallback based on state
  // TODO: Optional, if rule fails can return a truthy value and implicitly redirect up to the parent route recursively?
];
