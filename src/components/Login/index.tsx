import React, { FC } from 'react';

import { useUserState } from '../../utils/hooks/useUserState';

import ButtonRound from '../ButtonRound/';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
}> = ({ width, noLogout }) => {
  const { userData, login, logout } = useUserState();

  return (
    <>
      {!userData && (
        <ButtonRound width={width} toggle={login}>
          Konto anlegen / Einloggen
        </ButtonRound>
      )}
      {userData && !noLogout && (
        <ButtonRound width={width} toggle={logout}>
          Ausloggen
        </ButtonRound>
      )}
    </>
  );
};

export default Login;
