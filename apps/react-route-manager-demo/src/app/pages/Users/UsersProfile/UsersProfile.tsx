import { useAuth0 } from "@auth0/auth0-react";
import { RouterMetaWrap } from "@react-route-manager/react-route-manager";
import React from "react";
import { USERS_PROFILE } from "./UsersProfile.route";

const UsersProfile: React.FC = () => {
  const { user, isLoading } = useAuth0();

  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <img src={user.picture} alt={user.name} />
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </>
  );
};

export default RouterMetaWrap(USERS_PROFILE, UsersProfile);
