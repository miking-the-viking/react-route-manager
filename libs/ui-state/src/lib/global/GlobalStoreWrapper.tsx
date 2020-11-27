import { ApolloClient } from '@apollo/client';
import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

interface GlobalStoreWrapperProps {
  apolloClient: ApolloClient<any>;
}

const GlobalStoreWrapper: React.FC<GlobalStoreWrapperProps> = ({
  apolloClient,
  children,
}) => {
  // subscription to keep games up to date

  // const { games } = useSelector((state: AppState) => ({
  //     games: state.Game.games
  // }));
  // const dispatch = useDispatch();

  // useMyGamesMutatedEventSubscriptionHandler(apolloClient, data => {
  //     // should dispatch update to store here
  //     return data.MyGamesMutated.map(gameMutatedEvent => {
  //         const { game, action } = gameMutatedEvent;
  //         switch (action) {
  //             case 'created':
  //                 dispatch(AppendGames([game as Game]));
  //                 break;
  //             case 'modified':
  //                 dispatch(UpdateGame(game as Game) as any);
  //                 break;
  //             case 'deleted':
  //                 dispatch(DeleteGame(game.id) as any);
  //                 break;
  //             default:
  //                 return;
  //         }
  //     });
  // });

  return <Provider store={store}>{children}</Provider>;
};

export const GlobalStoreProviderFactory = (client: ApolloClient<any>) => ({
  children,
}) => {
  return (
    <Provider store={store}>
      <GlobalStoreWrapper apolloClient={client}>{children}</GlobalStoreWrapper>
    </Provider>
  );
};

export default GlobalStoreProviderFactory;
