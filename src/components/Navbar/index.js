import React, { useState } from "react";
import { useAuth0 } from "../../utils/auth0";
import styled from 'styled-components';

import ButtonBorder from '../ButtonBorder/';
import Link from '../Link/';

const StyledNavWrapper = styled.div`
  width: 100vw;
  position: absolute;
  top: 0;
  letter-spacing: .25px;
  left: 0;
  z-index: 100;
  height: 40px;
  font-size: 13px;
  padding: 15px;
  display: flex;
  align-items: center;
  background: white;
  border-bottom: 1px solid ${p => p.theme.colorLightGrey};
`;


const NavBar = p => {
  const [active, setActive] = useState('');
  const { isAuthenticated, loginWithRedirect, logout, loading } = useAuth0();

  return (
    <StyledNavWrapper>
      <Link to="/about" id="about" state={active} onClick={(e) => {setActive(e.target.id)}}>Über das Projekt</Link>
      <Link to="/search" id="search" state={active} onClick={(e) => {setActive(e.target.id)}}>Suche</Link>

      {!isAuthenticated && !loading && (
          <>
            <ButtonBorder onClick={() => loginWithRedirect({})}>Anmelden</ButtonBorder>
            <ButtonBorder onClick={() => loginWithRedirect({})}>Registrieren</ButtonBorder>
          </>
      )}
      {!isAuthenticated && loading && (
          <>
            Lade Authentifizierung ...
          </>
      )}
      {isAuthenticated && (
          <>
            <Link id="adopted" to="/adopted" state={active} onClick={(e) => {setActive(e.target.id)}}>Abonnierte Bäume</Link>
            <Link id="profile" to="/profile" state={active} onClick={(e) => {setActive(e.target.id)}}>Profil</Link>
            <ButtonBorder onClick={() => loginWithRedirect({})}>Abmelden</ButtonBorder>
          </>
      )}

      {/* {isAuthenticated && <button onClick={() => logout()}>Log out</button>}

      {isAuthenticated && (
        <span>
          <Link to="/">Home</Link>&nbsp;
          <Link to="/profile">Profile</Link>
        </span>
      )} */}
    </StyledNavWrapper>
  );
};

export default NavBar;