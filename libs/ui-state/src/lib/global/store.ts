import { combineReducers, compose, createStore } from 'redux';
import SystemReducer from './system';
import { AppActions, AppState } from './types';

const rootReducer = combineReducers<AppState, AppActions>({
  System: SystemReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  {},
  // process.env.NODE_ENV === 'development' ? composeEnhancers() : {}
  composeEnhancers()
);

export default store;
