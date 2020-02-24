import React, {Component} from 'react';
import styled from 'styled-components';
import Store from '../../state/Store';

import { fetchAPI, createAPIUrl } from '../../state/utils';
import { useAuth0 } from "../../utils/auth0";

const LoginWrapper = styled.span`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
`;

const LoginItem = styled.span`
 cursor: pointer;

 &:hover {
   opacity: .5;
 }
`;

const Login = p => {
  const { isAuthenticated, getTokenSilently, loginWithRedirect, logout, loading, user } = useAuth0();

  const handleClick = (type) => {
    if (type == 'login') {
      loginWithRedirect({})
    } else if (type == 'logout') {
      logout();
    }
  }

  return (
    <LoginWrapper>
      { !isAuthenticated && (<LoginItem onClick={() => handleClick('login')}>Login</LoginItem>)}
      { isAuthenticated && (<LoginItem onClick={() => handleClick('logout')}>Logout</LoginItem>)}
    </LoginWrapper>
  )
}

export default Login;