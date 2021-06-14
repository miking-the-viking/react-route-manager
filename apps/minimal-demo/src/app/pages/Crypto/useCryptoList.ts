import { useEffect, useState } from 'react';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { CryptoCurrencyListItem, getCurrencies } from './api/getCurrencies';
import { CryptoCurrencyPair, getPairs } from './api/getPairs';

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
};
export function useCryptoList() {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    setVariantState,
    state: { cryptos },
  } = useRouteManagerContext<CryptoState>();

  useEffect(() => {
    if (cryptos) return;
    (async () => {
      setLoading(true);
      const currenciesArray = await getCurrencies();
      const currenciesObj = currenciesArray
        .filter((c) => c.is_crypto)
        .reduce((acc, curr: CryptoCurrencyListItem) => {
          return {
            ...acc,
            [curr.code]: {
              details: curr,
              pairs: [],
            },
          };
        }, {} as { [k: string]: CryptoCurrencyData });
      const pairs = await getPairs();

      pairs.forEach((pair) => {
        currenciesObj[pair.base].pairs.push(pair);
      });

      setVariantState('cryptos', currenciesObj);

      setLoading(false);
    })();
  }, []);

  return { cryptos, loading };
}
