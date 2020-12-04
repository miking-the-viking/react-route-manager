import { useAuth0 } from "@auth0/auth0-react";
import {
  RouterMetaWrap,
  useRouteManagerContext,
} from "@react-route-manager/react-route-manager";
import React from "react";
import { useParams } from "react-router";
import { FOLLOWING_PROFILE } from "./FollowingProfile.route";

const FollowingProfile: React.FC = () => {
  const { user, isLoading } = useAuth0();
  const { id } = useParams();
  if (isLoading) return <p>Loading...</p>;

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
