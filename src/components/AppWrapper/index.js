import React, {useEffect} from 'react';
import styled from 'styled-components';

import DeckGlMap from '../map';
import Sidebar from '../Sidebar';
import NavBar from '../Navbar';
import Nav from '../Nav';
import Legend from '../Legend';
import Cookie from '../Cookie';
import Loading from '../Loading';
import Overlay from '../Overlay';
import Credits from '../Credits';

import logoCitylab from '!file-loader!../../assets/citylab-logo.svg';
import logoTSB from '!file-loader!../../assets/tsb-logo-coloured.svg';

import { useAuth0 } from '../../utils/auth0';
import Store from '../../state/Store'
import { fetchAPI, createAPIUrl, removeOverlay } from '../../utils';


const AppWrapperDiv = styled.div`
  font-family: ${props => props.theme.fontFamily};
  height: 100vh;
  width: 100vw;
`;

const CreditsContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    display: none;
  }

  @media screen and (min-width: ${p => p.theme.screens.tablet}) {
    display: block;
  }
`;

const AppWrapper = p => {
  const { isLoading, data, overlay } = p;

  const {
    loading,
    user,
    isAuthenticated,
    getTokenSilently,
    logout,
  } = useAuth0();

  removeOverlay();

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
      const res = await fetch(
        `${process.env.USER_DATA_API_URL}/api/user?userid=${encodeURIComponent(
          user.sub
        )}`,
        {
          // credentials: 'include',
          method: 'GET',
          mode: 'cors',
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        const json = await res.json();
        console.log(user);
        Store.setState({ user: json.data })
      } else {
        const text = await res.text();
        console.warn(text);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getUserDataFromManagementApi();
      fetchData();
    }
  }, [isLoading])

  return (
    <AppWrapperDiv>
      { isLoading && (<Loading/>) }
      {!isLoading && data && (<DeckGlMap data={data}/>)}
      {!isLoading && data && (<Sidebar/>)}
      {overlay && data && (<Overlay/>)}
      <Nav/>
      <CreditsContainer>
        <Credits/>
      </CreditsContainer>
      <Legend />
      <Cookie />
    </AppWrapperDiv>
  )
}

export default AppWrapper;