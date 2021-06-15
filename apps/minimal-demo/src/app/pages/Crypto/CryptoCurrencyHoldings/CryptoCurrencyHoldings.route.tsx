import {
  Route,
  RouteRule,
  RouteRuleEvaluator,
} from '@react-route-manager/react-route-manager';
import { CRYPTO } from '../Crypto.symbol';
import { CryptoState } from '../useCryptoList';
import { CRYPTO_CURRENCY_HOLDINGS } from './CryptoCurrencyHoldings.symbol';

const RequiresHoldingsInCode = (
  code: string
): RouteRuleEvaluator<CryptoState> => ({ holdings }) => {
  console.log(
    code,
    !!holdings && !!holdings[code] && holdings[code].amount > 0
  );
  return !!holdings && !!holdings[code] && holdings[code].amount > 0;
};

const REQUIRES_HOLDINGS_FOR_CODE = (code: string): RouteRule<CryptoState> => [
  [RequiresHoldingsInCode(code)],
  CRYPTO,
];

export const CryptoCurrencyHoldingsRoute = new Route<CryptoState>({
  path: ':currency/holdings',
  key: CRYPTO_CURRENCY_HOLDINGS,
  importComponent: () => import('./CryptoCurrencyHoldings'),
  name: 'Crypto Currency Holdings',
  description: 'Crypto Currency Holdings',
  collections: ['nav'],
  // rules: [
  //   REQUIRES_HOLDINGS_IN_CODE_REDIRECT
  // ],
  dynamicRoutes: ({ holdings = {}, cryptos = {} }) => {
    return Object.keys(holdings).map((key) => {
      const {
        code,
        name,
        has_enabled_pairs,
        is_base_of_enabled_pair,
        is_quote_of_enabled_pair,
      } = cryptos[key].details;

      return {
        name: `${name}${
          has_enabled_pairs &&
          (is_base_of_enabled_pair || is_quote_of_enabled_pair)
            ? ' *'
            : ''
        }`,
        rules: [
          // TODO: this rule is superfluous and doesn't work.
          REQUIRES_HOLDINGS_FOR_CODE(code),
        ],
        // TODO: Make the children of variants work
        // children: [CryptoCurrencyHoldingsRoute],
        params: {
          // TODO: see if can be typed better
          // potentially with template literal type?
          currency: code,
        },
      };
    });
  },
});
