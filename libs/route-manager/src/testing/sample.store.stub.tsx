import { Reducer } from 'react';
import { createStore } from 'redux';

export interface SampleStoreState {
    test: boolean;
}

export const SET_TEST_STATE = 'SET_TEST_STATE';

export interface SetTestStateType {
    type: typeof SET_TEST_STATE;
    test: boolean;
}

export const SetTestState = (test: boolean): SetTestStateType => ({
    type: SET_TEST_STATE,
    test
});

export type SampleStoreActions = SetTestStateType;

export const SampleReducer: Reducer<SampleStoreState, SampleStoreActions> = (
    state: SampleStoreState = { test: true },
    action
) => {
    return {
        ...state,
        test: action.test ?? state.test
    };
};

export const sampleStore = createStore(SampleReducer);

// export const WrapInSampleStoreFactory: (
//     storeState?: SampleStoreState
// ) => React.FC = storeState => ({ children }) => {
//     if (storeState != null) {
//         sampleStore.dispatch(SetTestState(storeState.test));
//     }
//     return <Provider store={sampleStore}>{children}</Provider>;
// };
