import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React, { Suspense, useContext } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { Redirect, Route, Switch } from 'react-router-dom';
import SAMPLE_ROUTES, { CORE_ROUTES } from '../testing/routes.stub';
import {
  sampleStore,
  SampleStoreState,
  SampleReducer,
  SetTestState,
} from '../testing/sample.store.stub';
import { RouteManagerProviderFactory } from '.';
import {
  SampleAppRouteManagerContext,
  SampleAppRouteManagerContextProvider,
} from '../testing/route-manager.config';
import { createStore } from 'redux';

jest.mock('../testing/SamplePage1', () => {
  return function DummySamplePage1(props: React.FC) {
    return <div data-testid="sample-page-1"></div>;
  };
});

jest.mock('../testing/SamplePage2', () => {
  return function DummySamplePage2(props: React.FC) {
    return <div data-testid="sample-page-2"></div>;
  };
});

const SampleSubRouter: React.FC = ({ children }) => {
  const { evaluatedRoutes, coreRoutes, setCoreRoutes } = useContext(
    SampleAppRouteManagerContext
  );

  return (
    <>
      <p data-testid="core-routes">
        There are{' '}
        <span data-testid="core-routes-length">{coreRoutes.length}</span> routes
      </p>
      <p data-testid="evaluated-routes">
        There are{' '}
        <span data-testid="evaluated-routes-length">
          {evaluatedRoutes.length}
        </span>{' '}
        routes
      </p>
      <Switch>
        {coreRoutes.map((key) => {
          const route = SAMPLE_ROUTES[key];
          return (
            <Route
              exact
              path={route.path}
              render={() => <route.render />}
              key={route.path}
            />
          );
        })}
        <Redirect to={SAMPLE_ROUTES.SAMPLE_PAGE_1.path} />
      </Switch>
    </>
  );
};

const SetupRouteManagerTestsWithContext: React.FC<SampleStoreState> = ({
  test,
}) => {
  const history = createMemoryHistory();

  sampleStore.dispatch(SetTestState(test));

  return (
    <Router history={history}>
      <Provider store={sampleStore}>
        <SampleAppRouteManagerContextProvider>
          <Switch>
            <Suspense fallback={<p data-testid="loading">Loading</p>}>
              <Route path="/" render={() => <SampleSubRouter />} />
            </Suspense>
          </Switch>
        </SampleAppRouteManagerContextProvider>
      </Provider>
    </Router>
  );
};

//
//
//  Store Definitions
//
//

describe('Route Manager Provider', () => {
  it('[Sanity Check]shows loading until state is ready then renders the default/redirect/fallback SamplePage1', async () => {
    try {
      const { container, getByTestId, findByTestId } = render(
        <SetupRouteManagerTestsWithContext test={true} />
      );
      getByTestId('loading');
      await findByTestId('sample-page-1');
    } catch (e) {
      console.error(e);
      throw e;
    }
  });
});
