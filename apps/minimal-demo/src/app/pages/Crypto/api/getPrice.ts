import { getData } from './utils/getData';

const url = (pair_name: string) =>
  `https://api.n.exchange/en/api/v1/get_price/${pair_name}/`;

export type CryptoCurrencyPrice = {
  amount_base: number;
  amount_quote: number;
  timestamp: number;
  price: number;
  pair: {
    base: string;
    quote: string;
  };
  max_amount_base: number;
  max_amount_quote: number;
  min_amount_base: number;
  min_amount_quote: number;
};

export const getPrice = (pair_name: string) => {
  return getData<CryptoCurrencyPrice[]>(url(pair_name));
};
