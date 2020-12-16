import { useAuth0 } from "@auth0/auth0-react";
import {
  useUnfollowUserMutation,
  useUserByIdQuery,
} from "@react-route-manager/hooks-api";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { apolloClient } from "@react-route-manager/ui-components";
import React, { useCallback, useContext, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { UsersContext } from "../../UsersContext";
import { FOLLOWING_PROFILE_ROUTE } from "./FollowingProfile.route";

const FollowingProfile: React.FC = () => {
  const navigate = useNavigate();

  const { user } = useAuth0();
  const { id } = useParams();

  const { called, data, loading, error } = useUserByIdQuery({
    client: apolloClient,
    variables: {
      id,
    },
  });

  const [unfollowUserMutation] = useUnfollowUserMutation({
    client: apolloClient,
  });

  const followedUser = useMemo(() => data?.users[0], [data]);

  const unfollow = useCallback(async () => {
    await unfollowUserMutation({
      variables: {
        followerId: user.sub,
        userId: id,
      },
    });
    navigate("/users/following/");
  }, [navigate, unfollowUserMutation, user, id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user profile for id {id}</p>;
  if (!called) return <p>Have not called the user by id yet...</p>;

  return (
    <>
      <p>id = {id}</p>
      <img src={followedUser.picture} alt={followedUser.name} />
      <h2>{followedUser.name}</h2>
      <p>{followedUser.email}</p>
      <button onClick={unfollow}>Unfollow</button>
    </>
  );
};

export default RouterMetaWrap(FOLLOWING_PROFILE_ROUTE, FollowingProfile);
