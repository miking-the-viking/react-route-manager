import { RouteManagerRouteConfig } from '../lib/types';
import { SampleStoreState } from './sample.store.stub';
import { lazy } from 'react';

const HasTestRule = ({ test }: SampleStoreState) => test;
const HasNotTestRule = ({ test }: SampleStoreState) => !test;

const SAMPLE_PAGE_1 = (): RouteManagerRouteConfig<SampleStoreState> => ({
  path: '/sample-1',
  icon: null,
  render: lazy(() =>
    import(/* webpackChunkName: "SamplePage1" */ './SamplePage1')
  ),
  description: 'Some Page',
  name: 'Sample Page 1',
  rules: [HasTestRule],
  fallback: '',
});

const SAMPLE_PAGE_2 = (): RouteManagerRouteConfig<SampleStoreState> => ({
  path: '/sample-2',
  icon: null,
  render: lazy(() =>
    import(/* webpackChunkName: "SamplePage2" */ './SamplePage2')
  ),
  name: 'Sample Page 2',
  description: 'Some page 2',
  fallback: '',
  // page: '/Signup/Signup',
  rules: [HasNotTestRule],
});

const SAMPLE_ROUTES = {
  SAMPLE_PAGE_1: SAMPLE_PAGE_1(),
  SAMPLE_PAGE_2: SAMPLE_PAGE_2(),
};

/**
 * The Implementing application define the core routes for the application along with their rules in their application.
 */
export const CORE_ROUTES = Object.keys(SAMPLE_ROUTES).map(
  (k) => SAMPLE_ROUTES[k]
) as RouteManagerRouteConfig<any>[];

export default SAMPLE_ROUTES;
