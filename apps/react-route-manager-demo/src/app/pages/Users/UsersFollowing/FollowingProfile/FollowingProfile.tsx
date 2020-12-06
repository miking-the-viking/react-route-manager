import { useUserByIdQuery } from "@react-route-manager/hooks-api";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import { apolloClient } from "@react-route-manager/ui-components";
import React, { useMemo } from "react";
import { useParams } from "react-router";
import { FOLLOWING_PROFILE } from "./FollowingProfile.route";

const FollowingProfile: React.FC = () => {
  const { id } = useParams();

  const { called, data, fetchMore, loading, error } = useUserByIdQuery({
    client: apolloClient,
    variables: {
      id,
    },
  });

  const user = useMemo(() => data?.users[0], [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading user profile for id {id}</p>;
  if (!called) return <p>Have not called the user by id yet...</p>;

  if (!data) return <p>data is falsy</p>;
  return (
    <>
      <p>id = {id}</p>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </>
  );
};

export default RouterMetaWrap(FOLLOWING_PROFILE, FollowingProfile);
