import { useAuth0 } from '@auth0/auth0-react';
import { AppState } from '@react-route-manager/ui-state';
import { useSelector } from 'react-redux';
import { RouterState } from './RouterState.type';

export function useRouterState(): RouterState {
  const state = useSelector((state: AppState) => state);
  const { isAuthenticated } = useAuth0();
  return { ...state, authenticated: isAuthenticated };
}
