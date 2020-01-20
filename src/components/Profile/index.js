import React, { Fragment } from "react";
import { useAuth0 } from "../../utils/auth0";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />

      <span>{user.name}</span>
      <span>{user.email}</span>
      <span>{JSON.stringify(user, null, 2)}</span>
    </Fragment>
  );
};

export default Profile;