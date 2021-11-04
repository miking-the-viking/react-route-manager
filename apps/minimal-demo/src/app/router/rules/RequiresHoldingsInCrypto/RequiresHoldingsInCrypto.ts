import {
  DynamicRouteRule,
  RouteRuleGen,
  RuleGenerator,
  Ruler,
} from '@react-route-manager/react-route-manager';
import { CRYPTO } from '../../../pages/Crypto/Crypto.symbol';
import { CryptoState } from '../../../pages/Crypto/useCryptoList';

export const RequiresHoldingsInCrypto: RuleGenerator<
  CryptoState,
  // this needs to match what Route Params will be
  {
    currency?: string;
  }
> = ({ currency = undefined }) => ({ holdings }) => {
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

@Ruler
export class RequiresDynamicHoldings extends DynamicRouteRule<
  CryptoState,
  { currency?: string }
> {
  rule = ({ currency = undefined }) => ({ holdings }: CryptoState) => {
    if (!currency || !holdings) return false;
    return !!holdings[currency] && holdings[currency].amount > 0;
  };
  redirect = CRYPTO;
}
console.log(RequiresDynamicHoldings);
console.log('ruleTuple', RequiresDynamicHoldings.ruleTuple);
