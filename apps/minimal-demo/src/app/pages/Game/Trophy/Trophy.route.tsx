import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { Route } from '@react-route-manager/react-route-manager';
import { REQUIRES_MINIMUM_CLICKS_REDIRECT_GENERATOR } from '../../../router/rules/HasMinimumClickCount/HasMinimumClickCount';
import { CLICKS_TROPHY_TIER_INTERVAL } from '../clicks.const';
import { GOD_TIER_ROUTE } from './GodTier/GodTier.route';
import { TROPHY } from './Trophy.symbol';

export const TROPHY_ROUTE = new Route({
  key: TROPHY,
  path: 'trophy',
  importComponent: () => import('./Trophy'),
  name: 'Trophy',
  description: 'Trophy for big numbers',
  icon: faBlind,
  collections: ['nav'],
  children: [GOD_TIER_ROUTE],
  rules: [
    REQUIRES_MINIMUM_CLICKS_REDIRECT_GENERATOR(CLICKS_TROPHY_TIER_INTERVAL),
  ],
});
