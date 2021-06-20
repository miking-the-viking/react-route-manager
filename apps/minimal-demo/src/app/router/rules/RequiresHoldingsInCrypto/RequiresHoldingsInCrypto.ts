import {
  RouteRule,
  RuleGenerator,
} from '@react-route-manager/react-route-manager';
import { CRYPTO } from '../../../pages/Crypto/Crypto.symbol';
import { CryptoState } from '../../../pages/Crypto/useCryptoList';
import { GAME } from '../../../pages/Game/Game.symbol';
import { ClicksState } from '../shared/ClicksState';

export const RequiresHoldingsInCrypto: RuleGenerator<
  CryptoState,
  // this needs to match what Route Params will be
  {
    currency?: string;
  }
> = ({ currency = undefined }) => ({ cryptos, holdings }) => {
  console.log(`Checking for holdings in ${currency}`, holdings);
  if (!currency) return false;
  return !!holdings[currency] && holdings[currency].amount > 0;
};

export const REQUIRES_HOLDINGS_IN_CRYPTO_REDIRECT: (
  crypto?: { currency?: string },
  redirect?: symbol | string
) => RouteRule<CryptoState> = (
  crypto = { currency: undefined },
  redirect = CRYPTO
) => [
  [RequiresHoldingsInCrypto(crypto)],
  redirect, // NOTE: Can use the route symbol instead of a hardcoded redirect path!
  // '/game' // Hardcoded strings also work, but are not recommended.
  // TODO: dynamic fallback based on state
  // TODO: Optional, if rule fails can return a truthy value and implicitly redirect up to the parent route recursively?
];
