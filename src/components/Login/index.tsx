import React, { FC, useEffect } from 'react';
import store from '../../state/Store';

import { createAPIUrl, requests } from '../../utils';
import { useAuth0 } from '../../utils/auth/auth0';

import ButtonRound from '../ButtonRound/';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
}> = ({ width, noLogout }) => {
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
            `/get?queryType=wateredbyuser&uuid=${user.sub}`
          );
          const urlAdoptedTrees = createAPIUrl(
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

    const getUserDataFromManagementApi = async () => {
      try {
        const token = await getTokenSilently();
        const apiUrl = `${
          process.env.USER_DATA_API_URL
        }/api/user?userid=${encodeURIComponent(user.sub)}`;

        const res = await requests(apiUrl, { token });
        store.setState({ user: res.data });
      } catch (error) {
        console.error(error);
      }
    };
    if (isAuthenticated && user) {
      getUserDataFromManagementApi().catch(console.error);
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
      {!isAuthenticated && (
        <ButtonRound width={width} toggle={() => handleClick('login')}>
          Konto anlegen / Einloggen
        </ButtonRound>
      )}
      {isAuthenticated && !noLogout && (
        <ButtonRound width={width} toggle={() => handleClick('logout')}>
          Ausloggen
        </ButtonRound>
      )}
    </>
  );
};

export default Login;
