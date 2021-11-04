import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RRM } from '@react-route-manager/react-route-manager';
import {
  RequiresMinimumClicks,
  REQUIRES_MINIMUM_CLICKS_REDIRECT_GENERATOR,
} from '../../../router/rules/HasMinimumClickCount/HasMinimumClickCount';
import { CLICKS_TROPHY_TIER_INTERVAL } from '../clicks.const';
import { GOD_TIER_ROUTE } from './GodTier/GodTier.route';
import { TROPHY } from './Trophy.symbol';

export const TROPHY_ROUTE = RRM.Route({
  key: TROPHY,
  path: 'trophy',
  importComponent: () => import('./Trophy'),
  name: 'Trophy',
  description: 'Trophy for big numbers',
  icon: faBlind,
  collections: ['nav'],
  children: [GOD_TIER_ROUTE],
  rules: [RequiresMinimumClicks(3)],
});
