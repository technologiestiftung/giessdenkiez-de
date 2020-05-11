import React, { useEffect } from 'react';
import styled from 'styled-components';
import Store from '../../state/Store';

import { fetchAPI, createAPIUrl } from '../../utils';
import { useAuth0 } from '../../utils/auth0';

import ButtonRound from '../ButtonRound/';

const Login = p => {
  const { width, noLogout } = p;
  const {
    isAuthenticated,
    getTokenSilently,
    loginWithRedirect,
    logout,
    loading,
    user,
  } = useAuth0();

  const fetchData = async () => {
    if (isAuthenticated) {
      const token = await getTokenSilently();
      const urlWateredByUser = createAPIUrl(
        Store.getState(),
        `/private/get-watered-trees-by-user?uuid=${user.sub}`
      );
      const urlAdoptedTrees = createAPIUrl(
        Store.getState(),
        `/private/get-adopted-trees?uuid=${user.sub}`
      );

      fetchAPI(urlWateredByUser, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then(r => {
        Store.setState({ wateredByUser: r.data });
      });

      fetchAPI(urlAdoptedTrees, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then(r => {
        Store.setState({ adoptedTrees: r.data });
      });
    }
  };

  const getUserDataFromManagementApi = async () => {
    try {
      // event.preventDefault();
      const token = await getTokenSilently();
      const apiUrl = `${process.env.USER_DATA_API_URL}/api/user?userid=${encodeURIComponent(user.sub)}`;
      fetchAPI(apiUrl, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }).then(r => {
        console.log(r);
        Store.setState({ user: r.data.data })
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      getUserDataFromManagementApi();
      fetchData();
    }
  }, [isAuthenticated, user])

  const handleClick = type => {
    if (type == 'login') {
      loginWithRedirect({ ui_locales: 'de' });
    } else if (type == 'logout') {
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
