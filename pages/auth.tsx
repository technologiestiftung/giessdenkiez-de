import React, { useEffect, useState } from 'react';
import { MapLayout } from '../src/components/MapLayout';
import { Page } from '../src/nextPage';
import {
  useSession,
  useSessionContext,
} from '@supabase/auth-helpers-react';
import {
  SidebarAuth,
} from '../src/components/Sidebar/SidebarAuth';
import { StyledFlexContainer, StyledFormRow } from '../src/components/Forms';
import {
  UserNotification,
  UserNotificationObjectType,
} from '../src/components/Notification';

import { useRouter } from 'next/router';

export type AuthView = 'signin' | 'signup' | 'recovery' | 'confirm';

const AuthPage: Page = () => {
  const { replace: routerReplace } = useRouter();
  const session = useSession();
  const { isLoading } = useSessionContext();

  const [view, setView] = useState<AuthView>('signin');

  useEffect(() => {
    if (session) routerReplace('/profile');
  }, [session, routerReplace]);

  const [
    currentNotification,
    setCurrentNotification,
  ] = useState<UserNotificationObjectType | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentNotification(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [currentNotification]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SidebarAuth
        isLoading={isLoading}
        view={view}
        setView={setView}
        setNotification={setCurrentNotification}
      />
      <StyledFlexContainer>
        <StyledFormRow>
          {currentNotification && (
            <UserNotification
              type={currentNotification.type}
              message={currentNotification.message}
            />
          )}
        </StyledFormRow>
      </StyledFlexContainer>
    </div>
  );
};
AuthPage.layout = MapLayout;

export default AuthPage;
