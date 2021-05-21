import { useAuth0 } from '@auth0/auth0-react';
import {
  UserFollowingQuery,
  useWhoImFollowingSubscription,
} from '@react-route-manager/hooks-api';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { apolloClient } from '@react-route-manager/ui-components';
import React, { useRef } from 'react';

export type UsersContextualState = {
  following: UserFollowingQuery['followers'];
};

export const UsersContext = React.createContext<UsersContextualState>({
  following: [],
});

export const UsersContextConsumer = UsersContext.Consumer;

export const UsersContextualWrapper: React.FC = ({ children }) => {
  const { user } = useAuth0();

  const { setVariantState } = useRouteManagerContext();

  const { data, loading, error } = useWhoImFollowingSubscription({
    client: apolloClient,
    fetchPolicy: 'no-cache',
    variables: {
      followerId: user?.sub,
    },
    shouldResubscribe: true,
    onSubscriptionData: (data) => {
      const followers = data?.subscriptionData?.data?.followers;
      if (!setVariantState || !followers) return;
      setVariantState('following', followers);
    },
  });

  return (
    <UsersContext.Provider
      value={{
        following: data?.followers,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};
