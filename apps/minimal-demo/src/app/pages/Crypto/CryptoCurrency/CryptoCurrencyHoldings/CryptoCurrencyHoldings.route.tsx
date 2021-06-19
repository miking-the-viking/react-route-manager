import {
  Route,
  RouteRule,
  RouteRuleEvaluator,
  RRM,
} from '@react-route-manager/react-route-manager';
import { CRYPTO } from '../../Crypto.symbol';
import { CryptoState } from '../../useCryptoList';
import { CRYPTO_CURRENCY } from '../CryptoCurrency.symbol';
import { CRYPTO_CURRENCY_HOLDINGS } from './CryptoCurrencyHoldings.symbol';

// const RequiresHoldingsInCode = (
//   code: string
// ): RouteRuleEvaluator<CryptoState> => ({ holdings }) => {
//   return !!holdings && !!holdings[code];
// };

// const REQUIRES_HOLDINGS_IN_CODE_REDIRECT = (
//   code: string
// ): RouteRule<CryptoState> => [[RequiresHoldingsInCode(code)], CRYPTO];

// export const CryptoCurrencyHoldingsRoute = (code: string) =>
//   new Route<CryptoState>({
//     path: 'hodlings',
//     key: CRYPTO_CURRENCY_HOLDINGS,
//     importComponent: () => import('./CryptoCurrencyHoldings'),
//     name: 'Crypto Currency Holdings',
//     description: 'Crypto Currency Holdings',
//     collections: ['nav'],
//     rules: [
//       // REQUIRES_HOLDINGS_IN_CODE_REDIRECT(code)
//     ],
//   });
export const CryptoCurrencyHoldingsRoute = RRM.Route({
  path: 'hodlings',
  key: CRYPTO_CURRENCY_HOLDINGS,
  importComponent: () => import('./CryptoCurrencyHoldings'),
  name: 'Holdings',
  description: 'Holdings for crypto',
  collections: ['nav'],
  rules: [],
});
