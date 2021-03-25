import React, { FC } from 'react';
import { useAccountActions } from '../../utils/hooks/useAccountActions';

import { useUserState } from '../../utils/hooks/useUserState';

import ButtonRound from '../ButtonRound/';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
}> = ({ width, noLogout }) => {
  const { userData } = useUserState();
  const { login, logout } = useAccountActions();

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
