// TODO: Make this component work right
import React, { FC } from 'react';
import Link from 'next/link';
import { useAccountActions } from '../../utils/hooks/useAccountActions';

import { useUserData } from '../../utils/hooks/useUserData';

import ButtonRound from '../ButtonRound';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
}> = ({ width, noLogout }) => {
  const { userData } = useUserData();
  const { logout } = useAccountActions();

  return (
    <>
      {!userData && (
        <Link href='/auth'>
          <ButtonRound width={width}>Konto anlegen / Einloggen</ButtonRound>
        </Link>
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
