import {
  RouteRule,
  RuleGenerator,
  Ruler,
  StaticRouteRule,
} from '@react-route-manager/react-route-manager';
import { CLICKS_TROPHY_TIER_INTERVAL } from '../../../pages/Game/clicks.const';
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

export const RequiresMinimumClicks = (minClicks: number, redirect = GAME) => {
  @Ruler
  class ctor extends StaticRouteRule<ClicksState> {
    rule = ({ clicks }: ClicksState) => clicks > minClicks;
    redirect = redirect;
  }
  return ctor;
};
