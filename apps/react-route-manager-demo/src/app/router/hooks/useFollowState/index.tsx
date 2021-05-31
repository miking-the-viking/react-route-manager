import { useAuth0 } from '@auth0/auth0-react';
import {
  UserCompleteFragment,
  useFollowStateSubscription,
} from '@react-route-manager/hooks-api';
import { useRouteManagerContext } from '@react-route-manager/react-route-manager';
import { apolloClient } from '@react-route-manager/ui-components';
import { useEffect } from 'react';

export type FollowState = {
  following: UserCompleteFragment[];
  followers: UserCompleteFragment[];
};

export function useFollowState() {
  const { user } = useAuth0();

  const { setVariantState, state } = useRouteManagerContext<FollowState>();

  const { loading, data } = useFollowStateSubscription({
    client: apolloClient,
    fetchPolicy: 'no-cache',
    variables: {
      userId: user?.sub,
    },
    shouldResubscribe: true,
  });

  useEffect(() => {
    if (loading || (data?.users?.length ?? 0) === 0) return;
    const user = data.users[0];
    const followers = user.followers_aggregate.nodes.map((n) => n.followers);
    const following = user.following_aggregate.nodes.map((n) => n.following);

    if (JSON.stringify(followers) !== JSON.stringify(state.followers))
      setVariantState('followers', followers);
    if (JSON.stringify(following) !== JSON.stringify(state.following))
      setVariantState('following', following);
  }, [data, state, loading, setVariantState]);
}
