import {
  RouteRuleEvaluator,
  RouteRule,
} from '@react-route-manager/react-route-manager';
import { CRYPTO } from '../../../pages/Crypto/Crypto.symbol';
import { CryptoState } from '../../../pages/Crypto/useCryptoList';

const RequiresCryptos: RouteRuleEvaluator<CryptoState> = ({ cryptos }) => {
  return !!cryptos && Object.keys(cryptos).length > 0;
};

export const REQUIRES_CRYPTOS_REDIRECT: RouteRule<CryptoState> = [
  [RequiresCryptos],
  CRYPTO,
];

// const RequiresRealCryptoCurrency = (
//   code: string
// ): RouteRuleEvaluator<CryptoState> => ({ cryptos }) => {
//   return !!cryptos && !!cryptos[code];
// };

// export const REQUIRES_REAL_CRYPTO_CURRENCY = (
//   code: string
// ): RouteRule<CryptoState> => [[RequiresRealCryptoCurrency(code)], CRYPTO_INDEX];
