import React, { useEffect } from 'react';
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
    user,
  } = useAuth0();

  useEffect(() => {
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
        })
          .then(r => {
            Store.setState({ wateredByUser: r.data });
            return;
          })
          .catch(console.error);

        fetchAPI(urlAdoptedTrees, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
          .then(r => {
            Store.setState({ adoptedTrees: r.data });
            return;
          })
          .catch(console.error);
      }
    };

    const getUserDataFromManagementApi = async () => {
      try {
        // event.preventDefault();
        const token = await getTokenSilently();
        const apiUrl = `${
          process.env.USER_DATA_API_URL
        }/api/user?userid=${encodeURIComponent(user.sub)}`;

        const res = await fetchAPI(apiUrl, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        });
        Store.setState({ user: res.data.data });

        // .then(r => {
        //   // console.log(r);
        //   Store.setState({ user: r.data.data });
        //   return;
        // })
        // .catch(console.error);
      } catch (error) {
        console.error(error);
      }
    };
    if (isAuthenticated && user) {
      getUserDataFromManagementApi();
      fetchData();
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
