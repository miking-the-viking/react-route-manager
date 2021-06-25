import { getData } from './utils/getData';

const url = (pair_name: string, amount_base = 1) =>
  `https://api.n.exchange/en/api/v1/get_price/${pair_name}/?amount_base=${amount_base}`;

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

export const getPrice = (pair_name: string, amount_base = 1) => {
  return getData<CryptoCurrencyPrice>(url(pair_name, amount_base));
};
