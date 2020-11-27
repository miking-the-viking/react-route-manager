import { SystemActions, SystemState } from './system';

export type AppState = {
  System: SystemState;
};

export type AppActions = SystemActions;
