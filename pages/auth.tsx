import React, { useEffect, useState } from 'react';
import { MapLayout } from '../src/components/MapLayout';
import { Page } from '../src/nextPage';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { SidebarAuth } from '../src/components/Sidebar/SidebarAuth';
import { PasswordResetForm } from '../src/components/Sidebar/SidebarAuth/PasswordResetForm';
import { UpdateUserDataForm } from '../src/components/Sidebar/SidebarAuth/UpdateUserDataForm';
import ButtonRound from '../src/components/ButtonRound';
import { StyledFlexContainer, StyledFormRow } from '../src/components/Forms';
import {
  UserNotification,
  UserNotificationObjectType,
} from '../src/components/Sidebar/SidebarAuth/Notification';
import ExpandablePanel from '../src/components/ExpandablePanel';
export type AuthView = 'signin' | 'signup' | 'recovery' | 'confirm';

const AuthPage: Page = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [showPasswordResetScreen, setShowPasswordResetScreen] = useState(false);
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
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          // console.log('SIGNED_IN', session);
          break;
        case 'SIGNED_OUT':
          // console.log('SIGNED_OUT');
          break;
        case 'USER_UPDATED':
          // console.log('USER_UPDATED', session?.user);
          break;
        case 'PASSWORD_RECOVERY':
          // console.log('PASSWORD_RECOVERY', session);

          // show screen to update user's password
          setShowPasswordResetScreen(true);
          break;
        case 'TOKEN_REFRESHED':
          // console.log('TOKEN_REFRESHED', session);
          break;
        case 'USER_DELETED':
          // console.log('USER_DELETED');
          break;
        default:
          // console.log('UNKNOWN_EVENT', event);
          throw new Error('Unknown event type');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showPasswordResetScreen) {
    return (
      <>
        <PasswordResetForm
          setNotification={setCurrentNotification}
          returnClickHandler={() => {
            setShowPasswordResetScreen(false);
            setView('signin');
          }}
          additionalSubmitHandler={() => {
            setShowPasswordResetScreen(false);
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
          view={view}
          setView={setView}
          setNotification={setCurrentNotification}
        />
      ) : (
        <>
          <UpdateUserDataForm setNotification={setCurrentNotification} />

          <ExpandablePanel isExpanded={false} title={'Passwort'}>
            <StyledFlexContainer>
              <StyledFormRow>
                <ButtonRound
                  onClick={e => {
                    e?.preventDefault();

                    setShowPasswordResetScreen(true);
                  }}
                >
                  Passwort ändern?
                </ButtonRound>
              </StyledFormRow>
              <StyledFormRow>
                {process.env.NODE_ENV !== 'production' && (
                  <details>
                    <summary>Dev Info: Session</summary>
                    <pre
                      style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}
                    >
                      <code>{JSON.stringify(session, null, 2)}</code>
                    </pre>
                  </details>
                )}
              </StyledFormRow>
            </StyledFlexContainer>
          </ExpandablePanel>
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
