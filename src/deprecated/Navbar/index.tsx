import React, { useState } from 'react';
import { useAuth0 } from '../../utils/auth0';
import styled from 'styled-components';
import Store from '../../state/Store';
import { connect } from 'unistore/react';
import { fetchAPI, createAPIUrl } from '../../utils';
import Actions from '../../state/Actions';

import ButtonBorder from '../../components/ButtonBorder';
import Link from '../../components/Link';

const StyledNavWrapper = styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  letter-spacing: 0.25px;
  left: 0;
  z-index: 100;
  height: 40px;
  font-size: 13px;
  padding: 15px;
  display: flex;
  align-items: center;
  background: white;
  border-bottom: 1px solid ${p => p.theme.colorLightGrey};
  box-shadow: ${p => p.theme.boxShadow};

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    display: none;
  }
`;

/**
 *
 * @deprecated Not used around here
 */
const NavBar = p => {
  const { state } = p;
  const [active, setActive] = useState('');
  const {
    isAuthenticated,
    getTokenSilently,
    loginWithRedirect,
    logout,
    loading,
    user,
  } = useAuth0();

  const getAdoptedTrees = async () => {
    Store.setState({ selectedTreeState: 'LOADING' });
    const token = await getTokenSilently();
    // const mail = user.mail;
    const url = createAPIUrl(
      state,
      `/private/get-adopted-trees?mail=${user.email}`
    );

    await fetchAPI(url, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then(r => {
        Store.setState({
          selectedTreeState: 'FETCHED',
          adoptedTrees: r.data.adopted,
        });
        return;
      })
      .catch(console.error);
  };

  return (
    <StyledNavWrapper>
      <Link
        to='/about'
        id='about'
        state={active}
        onClick={e => {
          setActive(e.target.id);
        }}
      >
        Über das Projekt
      </Link>
      <Link
        to='/search'
        id='search'
        state={active}
        onClick={e => {
          setActive(e.target.id);
        }}
      >
        Suche
      </Link>

      {!isAuthenticated && loading && <>Lade Authentifizierung ...</>}

      {!isAuthenticated && !loading && (
        <>
          <ButtonBorder onClick={() => loginWithRedirect({ ui_locales: 'de' })}>
            Anmelden
          </ButtonBorder>
          <ButtonBorder onClick={() => loginWithRedirect({ ui_locales: 'de' })}>
            Registrieren
          </ButtonBorder>
        </>
      )}

      {isAuthenticated && !loading && (
        <>
          <Link
            id='adopted'
            to='/adopted'
            state={active}
            onClick={e => {
              getAdoptedTrees();
              setActive(e.target.id);
            }}
          >
            Adoptierte Bäume
          </Link>
          <Link
            id='profile'
            to='/profile'
            state={active}
            onClick={e => {
              setActive(e.target.id);
            }}
          >
            Profil
          </Link>
          <ButtonBorder onClick={() => logout({})}>Abmelden</ButtonBorder>
        </>
      )}
    </StyledNavWrapper>
  );
};

// export default connect(
//   state => ({
//     state: state,
//   }),
//   Actions
// )(NavBar);
