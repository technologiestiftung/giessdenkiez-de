import React, { FC } from 'react';
import { useUserData } from '../../utils/hooks/useUserData';
import ButtonRound from '../ButtonRound';
import Router from 'next/router';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

const Login: FC<{
  width?: string;
  noLogout?: boolean;
  onLogout?: () => void;
}> = ({ width, noLogout, onLogout }) => {
  const content = useLocalizedContent();
  const { loginAction, logoutAction } = content.sidebar.profile;
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
          {loginAction}
        </ButtonRound>
      )}
      {userData && !noLogout && (
        <ButtonRound width={width} onClick={onLogout}>
          {logoutAction}
        </ButtonRound>
      )}
    </>
  );
};

export default Login;
