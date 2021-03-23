import React, { FC } from 'react';

import { useAuth0 } from '../../utils/auth/auth0';

import ButtonRound from '../ButtonRound/';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
}> = ({ width, noLogout }) => {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  return (
    <>
      {!isAuthenticated && (
        <ButtonRound
          width={width}
          onClick={() => loginWithRedirect({ ui_locales: 'de' })}
        >
          Konto anlegen / Einloggen
        </ButtonRound>
      )}
      {isAuthenticated && !noLogout && (
        <ButtonRound width={width} onClick={() => logout()}>
          Ausloggen
        </ButtonRound>
      )}
    </>
  );
};

export default Login;
