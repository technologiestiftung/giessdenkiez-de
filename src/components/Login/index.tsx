import React, { FC } from 'react';
import { useAccountActions } from '../../utils/hooks/useAccountActions';

import { useUserData } from '../../utils/hooks/useUserData';

import ButtonRound from '../ButtonRound';
import Router from 'next/router';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
}> = ({ width, noLogout }) => {
  const content = useLocalizedContent();
  const { loginAction, logoutAction } = content.sidebar.profile;
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
          {loginAction}
        </ButtonRound>
      )}
      {userData && !noLogout && (
        <ButtonRound width={width} onClick={logout}>
          {logoutAction}
        </ButtonRound>
      )}
    </>
  );
};

export default Login;
