import { Reducer } from 'redux';

export interface SystemState {
  loading: boolean;
  navExpanded: boolean;
}

export const SET_LOADING = 'SET_LOADING';
export const SET_NAV_EXPANDED = 'SET_NAV_EXPANDED';

interface SetLoadingType {
  type: typeof SET_LOADING;
  loading: boolean;
}

export const SetLoading = (loading: boolean): SetLoadingType => ({
  type: SET_LOADING,
  loading,
});

interface SetNavExpandedType {
  type: typeof SET_NAV_EXPANDED;
  navExpanded: boolean;
}

export const SetNavExpanded = (navExpanded: boolean): SetNavExpandedType => ({
  type: SET_NAV_EXPANDED,
  navExpanded,
});

export type SystemActions = SetLoadingType | SetNavExpandedType;

export const initialDefaultSystemState: SystemState = {
  loading: false,
  navExpanded: false,
};

export const SystemReducer: Reducer<SystemState, SystemActions> = (
  state: SystemState = initialDefaultSystemState,
  action
) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.loading };
    case SET_NAV_EXPANDED:
      return { ...state, navExpanded: action.navExpanded };
    default:
      return { ...state };
  }
};

export default SystemReducer;
