import { useEffect, useState } from 'react';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { CryptoCurrencyListItem, getCurrencies } from './api/getCurrencies';
import { CryptoCurrencyPair, getPairs } from './api/getPairs';
import { getPrice } from './api/getPrice';

//https://nexchange2.docs.apiary.io/#reference/0/ticker-summarized-volume/get-ticker

export type CryptoState = {
  cryptos: { [key: string]: CryptoCurrencyData };
  holdings: {
    [key: string]: {
      amount: number;
    };
  };
};

export type CryptoCurrencyData = {
  details: CryptoCurrencyListItem;
  pairs: CryptoCurrencyPair[];
  price: number;
};

const stored = JSON.parse(localStorage.getItem('stored-crypto') ?? '{}');

const RESTRICTED_CRYPTO = ['BTC', 'XRP', 'DOGE', 'ETH'] as const;
const amount = {
  DOGE: 850,
  ETH: 1,
  XRP: 180,
  BTC: 1,
};
export function useCryptoList() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    setVariantState,
    state: { cryptos, holdings = stored },
  } = useRouteManagerContext<CryptoState>();

  useEffect(() => {
    if (cryptos) return;
    (async () => {
      setLoading(true);
      const currenciesArray = await getCurrencies();
      const currenciesObj = currenciesArray
        .filter((c) => c.is_crypto && RESTRICTED_CRYPTO.includes(c.code as any))
        .reduce((acc, curr: CryptoCurrencyListItem) => {
          return {
            ...acc,
            [curr.code]: {
              details: curr,
              pairs: [],
              price: 0,
            },
          };
        }, {} as { [k: string]: CryptoCurrencyData });
      const pairs = await getPairs();

      await Promise.all(
        pairs.map(async (pair) => {
          if (currenciesObj[pair.base])
            currenciesObj[pair.base].pairs.push(pair);

          // if quote is USD, then lets load the pricing as we'll do some rules around that
          if (
            pair.quote === 'USD' &&
            RESTRICTED_CRYPTO.includes(pair.base as any)
          ) {
            const pricing = await getPrice(pair.name, amount[pair.base] ?? 1);
            currenciesObj[pair.base].price = pricing.price;
          }
        })
      );

      setVariantState('cryptos', currenciesObj);
      setVariantState('holdings', holdings);

      setLoading(false);
    })();
  }, []);

  return { cryptos, loading };
}
