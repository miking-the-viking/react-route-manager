import {
  RouteRule,
  RouteRuleGen,
  RuleGenerator,
} from '@react-route-manager/react-route-manager';
import { CRYPTO } from '../../../pages/Crypto/Crypto.symbol';
import { CryptoState } from '../../../pages/Crypto/useCryptoList';

export const RequiresHoldingsInCrypto: RuleGenerator<
  CryptoState,
  // this needs to match what Route Params will be
  {
    currency?: string;
  }
> = ({ currency = undefined }) => ({ cryptos, holdings }) => {
  if (!currency || !holdings) return false;
  return !!holdings[currency] && holdings[currency].amount > 0;
};

export const RequiresHoldingsInCryptoRedirectRule: RouteRuleGen<
  CryptoState,
  { currency?: string }
> = [
  ({ currency = undefined }) => RequiresHoldingsInCrypto({ currency }),
  CRYPTO,
];
