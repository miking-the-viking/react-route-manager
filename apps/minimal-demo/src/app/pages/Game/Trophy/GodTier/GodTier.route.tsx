import { faBlind } from '@fortawesome/free-solid-svg-icons';
import { RRM } from '@react-route-manager/react-route-manager';
import {
  RequiresMinimumClicks,
  REQUIRES_MINIMUM_CLICKS_REDIRECT_GENERATOR,
} from '../../../../router/rules/HasMinimumClickCount/HasMinimumClickCount';
import { GOD_TIER_LIMIT } from '../../clicks.const';
import { TROPHY } from '../Trophy.symbol';
import { GOD_TIER } from './GodTier.symbol';

export const GOD_TIER_ROUTE = RRM.Route({
  key: GOD_TIER,
  path: 'god',
  importComponent: () => import('./GodTier'),
  name: 'GODLY',
  description: 'You are a God.',
  icon: faBlind,
  collections: ['nav'],
  rules: [RequiresMinimumClicks(GOD_TIER_LIMIT, TROPHY)],
});
