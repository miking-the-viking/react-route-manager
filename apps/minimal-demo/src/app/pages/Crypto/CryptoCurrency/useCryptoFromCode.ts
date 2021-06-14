import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { CryptoState } from '../useCryptoList';

export function useCryptoFromCode(code: string) {
  const {
    state: { cryptos },
  } = useRouteManagerContext<CryptoState>();

  return cryptos[code];
}
