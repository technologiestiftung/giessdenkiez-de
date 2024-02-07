import React, { FC } from 'react';
import { useUserData } from '../../utils/hooks/useUserData';
import Router from 'next/router';
import ButtonRound from '../ButtonRound';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
  onLogout?: () => void;
}> = ({ width, noLogout, onLogout }) => {
  const { userData } = useUserData();

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
        <ButtonRound width={width} onClick={onLogout}>
          Ausloggen
        </ButtonRound>
      )}
    </>
  );
};

export default Login;
