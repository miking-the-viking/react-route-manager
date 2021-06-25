import {
  RouteRuleGen,
  RuleGenerator,
} from '@react-route-manager/react-route-manager';
import { CRYPTO } from '../../../pages/Crypto/Crypto.symbol';
import { CryptoState } from '../../../pages/Crypto/useCryptoList';

export const RequiresMinimalUSDHoldings = (
  amount: number
): RuleGenerator<
  CryptoState,
  // this needs to match what Route Params will be
  {
    currency?: string;
  }
> => ({ currency = undefined }) => ({ cryptos, holdings }) => {
  if (!currency || !cryptos) return false;
  return (
    !!cryptos[currency] &&
    cryptos[currency].price * (holdings[currency]?.amount ?? 0) > amount
  );
};

export const RequiresMinimalUSDHoldingsRedirectRule = (
  amount: number
): RouteRuleGen<CryptoState, { currency?: string }> => [
  ({ currency = undefined }) =>
    RequiresMinimalUSDHoldings(amount)({ currency }),
  CRYPTO,
];
