import React, { FC } from 'react';
import { useAccountActions } from '../../utils/hooks/useAccountActions';

import { useUserData } from '../../utils/hooks/useUserData';

import ButtonRound from '../ButtonRound/';

interface UserProfile {
  uuid: string;
  email: string;
  username?: string;
  prefered_username?: string;
  family_name?: string;
  given_name?: string;
  gender?: string;
  street?: string;
  street_number?: string;
  city?: string;
  zipcode?: string;
  country?: string;
  phone_number?: string;
}

const createUserProfile = ({ token, user, username, email, }): Promise<UserProfile> => {
  const urlPostUserProfile = createAPIUrl(store.getState(), `/post`);

  return requests<UserProfile, { method: 'POST'; body: string }>(
    urlPostUserProfile,
    {
      token,
      override: {
        method: 'POST',
        body: JSON.stringify({
          uuid: user.sub,
          username,
          email,
          queryType: 'user',
        }),
      },
    }
  );
}


const Login: FC<{
  width?: string;
  noLogout?: boolean;
}> = ({ width, noLogout }) => {
  const { userData } = useUserData();
  const { login, logout } = useAccountActions();

  const { width, noLogout } = p;
  const {
    isAuthenticated,
    getTokenSilently,
    loginWithRedirect,
    logout,
    user,
  } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isAuthenticated) {
          const token = await getTokenSilently();

          const urlWateredByUser = createAPIUrl(
            store.getState(),
            // `/private/get-watered-trees-by-user?uuid=${user.sub}`
            `/get?queryType=wateredbyuser&uuid=${user.sub}`
          );
          const urlAdoptedTrees = createAPIUrl(
            store.getState(),
            // `/private/get-adopted-trees?uuid=${user.sub}`
            `/get?queryType=adopted&uuid=${user.sub}`
          );
          const jsonWateredByUser = await requests(urlWateredByUser, { token });
          store.setState({ wateredByUser: jsonWateredByUser.data });
          const jsonAdoptedByUser = await requests(urlAdoptedTrees, { token });
          store.setState({ adoptedTrees: jsonAdoptedByUser.data });
        }
      } catch (error) {
        console.error(error);
        throw error;
      }
    };

    /**
     * This request goes to a different API
     *
     */
    const getUserDataFromManagementApi = async () => {
      try {
        // event.preventDefault();
        const token = await getTokenSilently();
        const apiUrl = `${
          process.env.USER_DATA_API_URL
        }/api/user?userid=${encodeURIComponent(user.sub)}`;

        const res = await requests(apiUrl, { token });
        store.setState({ user: res.data });

        const { username, email } = res.data ;

        if (user.sub === "auth0|5f29bb0c53a5990037970148" && username && email) {
          const urlGetUserProfile = createAPIUrl(
            store.getState(),
            `/get?queryType=user-profile&uuid=${user.sub}`
          );
          var existingUserProfile = await requests(urlGetUserProfile, { token });
          if (!existingUserProfile.data) {
            existingUserProfile = await createUserProfile({ token, user, username, email })
          }  
        }

        return res.data
      } catch (error) {
        console.error(error);
      }
    };
    if (isAuthenticated && user) {
      getUserDataFromManagementApi()
      fetchData().catch(console.error);
    }
  }, [isAuthenticated, user, getTokenSilently]);

  const handleClick = type => {
    if (type === 'login') {
      loginWithRedirect({ ui_locales: 'de' });
    } else if (type === 'logout') {
      logout();
    }
  };

  return (
    <>
      {!userData && (
        <ButtonRound width={width} onClick={login}>
          Konto anlegen / Einloggen
        </ButtonRound>
      )}
      {userData && !noLogout && (
        <ButtonRound width={width} onClick={logout}>
          Ausloggen
        </ButtonRound>
      )}
    </>
  );
};

export default Login;
