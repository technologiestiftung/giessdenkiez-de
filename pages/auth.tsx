import React, { useEffect, useState } from 'react';
import { MapLayout } from '../src/components/MapLayout';
import { Page } from '../src/nextPage';
import {
  useSession,
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';
import { SidebarAuth } from '../src/components/Sidebar/SidebarAuth';
import { StyledFlexContainer, StyledFormRow } from '../src/components/Forms';
import {
  UserNotification,
  UserNotificationObjectType,
} from '../src/components/Notification';

import { SignOut } from '../src/components/Sidebar/SidebarAuth/SignOut';
import SidebarTitle from '../src/components/Sidebar/SidebarTitle';
import Router from 'next/router';
import SmallParagraph from '../src/components/SmallParagraph';
import Link from 'next/link';
import { PasswordRecoveryForm } from '../src/components/Forms/PasswordRecoveryForm';
export type AuthView = 'signin' | 'signup' | 'recovery' | 'confirm';

const AuthPage: Page = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const { isLoading } = useSessionContext();
  const [showPasswordRecoveryScreen, setShowPasswordRecoveryScreen] = useState(
    false
  );
  const [view, setView] = useState<AuthView>('signin');

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
  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(event => {
      switch (event) {
        case 'PASSWORD_RECOVERY':
          // show screen to update user's password
          setShowPasswordRecoveryScreen(true);
          break;
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showPasswordRecoveryScreen) {
    return (
      <>
        <PasswordRecoveryForm
          setNotification={setCurrentNotification}
          returnClickHandler={() => {
            setShowPasswordRecoveryScreen(false);
            setView('signin');
          }}
          additionalSubmitHandler={() => {
            setShowPasswordRecoveryScreen(false);
            Router.push('/profile');
          }}
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
      </>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {!session ? (
        <SidebarAuth
          isLoading={isLoading}
          view={view}
          setView={setView}
          setNotification={setCurrentNotification}
        />
      ) : (
        <>
          <SidebarTitle>{'Auth'}</SidebarTitle>
          <SmallParagraph>
            Ups. Du solltest hier gar nicht sein. Wie wäre es mit deinem{' '}
            <Link href={'/profile'}>Profil?</Link>
          </SmallParagraph>
          <StyledFlexContainer>
            <StyledFormRow>
              <SignOut setView={setView} />
            </StyledFormRow>
          </StyledFlexContainer>
        </>
      )}
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
