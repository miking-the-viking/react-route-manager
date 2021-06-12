import { getData } from './utils/getData';
export type CryptoCurrencyLatestPrice = {
  created_on: string;
  unix_time: string;
  expiration_time_unix: string;
  ticker: {
    ask: string;
    bid: string;
  };
  market: {
    name: string;
    code: string;
  };
  rate: string;
  rate_id: string;
  allowed_historic_price_variance: boolean;
  allowed_historic_price_age: boolean;
};

const url = (pair_name: string, market_code?: string) =>
  `https://api.n.exchange/en/api/v1/price/${pair_name}/latest/${
    market_code ? `?market_code=${market_code}` : ''
  }`;

export const getLatestPrice = (pair_name: string, market_code?: string) => {
  return getData<CryptoCurrencyLatestPrice[]>(url(pair_name, market_code));
};
