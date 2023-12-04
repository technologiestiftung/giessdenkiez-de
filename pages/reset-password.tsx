import { Page } from '../src/nextPage';
import React, { useEffect, useState } from 'react';
import { MapLayout } from '../src/components/MapLayout';
import { PasswordRecoveryForm } from '../src/components/Forms/PasswordRecoveryForm';
import {
  CredentialsSubline,
  StyledFlexContainer,
  StyledFormRow,
} from '../src/components/Forms';
import {
  StyledSpacer,
} from '../src/components/Sidebar/SidebarAuth';
import {
  UserNotification,
  UserNotificationObjectType,
} from '../src/components/Notification';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import SidebarTitle from '../src/components/Sidebar/SidebarTitle';
import LoadingIcon, {
  SidebarLoadingContainer,
} from '../src/components/LoadingIcon';
import { ImprintAndPrivacy } from '../src/components/ImprintAndPrivacy';

const ResetPage: Page = () => {
  const { push: routerPush } = useRouter();
  const supabase = useSupabaseClient();

  const [showPasswordRecoveryScreen, setShowPasswordRecoveryScreen] = useState(
    false
  );

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
    console.log('subscribe authListener');
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange(event => {
      switch (event) {
        case 'PASSWORD_RECOVERY':
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
            routerPush('/auth');
          }}
          additionalSubmitHandler={() => {
            setShowPasswordRecoveryScreen(false);
            routerPush('/profile');
          }}
        />
        <StyledFlexContainer>
          <StyledFormRow>
            {currentNotification && (
              <>
                <StyledSpacer />{' '}
                <UserNotification
                  type={currentNotification.type}
                  message={currentNotification.message}
                />
              </>
            )}
          </StyledFormRow>
        </StyledFlexContainer>
      </>
    );
  }

  return (
    <>
      <SidebarTitle>Passwort ändern</SidebarTitle>
      <SidebarLoadingContainer>
        <LoadingIcon text={'Laden...'} />
        <CredentialsSubline
          text={'Zurück zur Anmeldung?'}
          aText={'Hier klicken'}
          onClick={() => routerPush('/auth')}
        />
      </SidebarLoadingContainer>
      <ImprintAndPrivacy />
    </>
  );
};

ResetPage.layout = MapLayout;
export default ResetPage;
