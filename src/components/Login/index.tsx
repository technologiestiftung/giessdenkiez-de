import React, { FC } from 'react';
import { useAccountActions } from '../../utils/hooks/useAccountActions';

import { useUserData } from '../../utils/hooks/useUserData';

import ButtonRound from '../ButtonRound';
import Router from 'next/router';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
}> = ({ width, noLogout }) => {
  const { userData } = useUserData();
  const { logout } = useAccountActions();

  return (
    <>
      {!userData && (
        <ButtonRound
          width={width}
          onClick={() => {
            Router.push('/auth');
          }}
        >
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
