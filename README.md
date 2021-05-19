# ReactRouteManager

This project was generated using [Nx](https://nx.dev).

# Usage

The intention of the React Route Manager is to provide a simple, opinionated framework for your React application. Reusable configuration is hoisted to promote DRY code with less boilerplate polluting page components or routing.

## Setup

Once installed, setting up the RouteManager can be setup in one of two ways, depending on (1) if any components outside of the pages require access to the Browser for location or navigation (such as Auth0 callback) and (2)

### Simplest, Single Component

In the event that no components outside of the Router require access to the Browser (for useLocation, useNavigate, etc.) then it is possible to setup the router with a single component.

```
const RouteManagerProvider = RouteManagerProviderFactory<RouterState>();

<RouteManagerProvider
  routes={routes}
  state={state}
/>

```

This will detect that there is no BrowserRouter setup and will wrap itself accordingly.

### Advanced, Manual BrowserProvider Setup

If you require access to the Browser outside of the RouteManager, then you can manually wrap the component and RouteManager in the `<BrowserProvider>`, this will allow access to the browser. An example is the implementation in the sample application of this library using Auth0.

The RouteRules require authenticated state to determine if the user is a guest or not, for the RouteManager state `authenticated: boolean` is being included. This callback requires navigation, hence access to the BrowserProvider.

```ts
// App.tsx
const App: React.FC = () => (
  <BrowserProvider>
    <AuthContext>
      <AppRouter />
    </AuthContext>
  </BrowserProvider>
);

// AppRouter.tsx
const Router: React.FC<RouterProps> = ({ Wrapper }) => {
  const state = useSelector((state: AppState) => state);

  const {
    getAccessTokenSilently,
    isAuthenticated,
    isLoading,
    error,
  } = useAuth0();

  useEffect(() => {
    (async () => {
      let token;
      if (isAuthenticated) {
        token = await getAccessTokenSilently();
      }
      if (token && token.length > 0) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem(token);
      }
    })();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (error) {
    return <div>Oops... {error.message}</div>;
  }

  if (isLoading) {
    return <LoadingFallback />;
  }
  return (
    <>
      <RouteManagerProvider
        routes={routes}
        state={{ ...state, authenticated: isAuthenticated }}
      />
    </>
  );
};
```

## Defining Pages

Defining a page component requires two files:

1. The page component, such as `Users.tsx`
2. The route definition, such as `Users.route.tsx`, this file defines

- \* `key` unique symbol to reference this route by
- \* `path` URL path for the page
- \* `lazyLoadedComponent` the lazy load import to the page component
- \* `name` name to reference the page by
- `description` optional desription of the page
- `icon` optional icon for certain displays
- `rules` optional ACL with redirect behavior
- `collections` optional collections the route should belong to

```ts
// Users.route.ts
export const USERS = Symbol('Users');

export const USERS_ROUTE: RouteConfig = {
  key: USERS,
  path: 'users',
  lazyLoadedComponent: lazy(() => import('./Users')),
  name: 'Users',
  description: 'Users in the application',
  icon: RouterIcon(faBlind),
  rules: [REQUIRES_AUTH_LOGIN_REDIRECT],
  collections: ['nav'],
  children: [USERS_INDEX_ROUTE, USERS_PROFILE_ROUTE, USERS_FOLLOWING_ROUTE],
};
```

### Defining Rules

Rules are composed in a typesafe format, a `RouteRule` has two requirements:

1. \* 1...n conditions that are to be evaluated (such as isLoggedIn), defined as the generic `RouteRuleEvaluator`
2. \* a redirect route for when the condition fails. (TODO: Make optional, move UP the route tree is unsatisfied))

```ts
// Rule Evaluator
export const RequiresAuth: RouteRuleEvaluator<{ authenticated: boolean }> = ({
  authenticated,
}) => authenticated;

// Rule
export const REQUIRES_AUTH_LOGIN_REDIRECT: RouteRule<{
  authenticated: boolean;
}> = [[RequiresAuth], '/redirect-route-for-guest'];
```

# Development
