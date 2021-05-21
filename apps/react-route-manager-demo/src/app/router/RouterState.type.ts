import { AppState } from '@react-route-manager/ui-state';

/**
 * Shape of the Application State that will be used for Route Rule evaluation
 */
export type RouterState = AppState & {
  authenticated: boolean;
};
