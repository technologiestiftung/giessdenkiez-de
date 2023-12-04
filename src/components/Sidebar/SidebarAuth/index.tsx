import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import { AuthView } from '../../../../pages/auth';
import SidebarTitle from '../SidebarTitle';
import { UserNotificationObjectType } from '../../Notification';
import { CredentialsSubline } from '../../Forms';
import Router from 'next/router';
import { CredentialsData } from '../../../common/interfaces';
import { CredentialsForm } from '../../Forms/CredentialsForm';
import { SidebarLoading } from '../SidebarLoading';
import styled from 'styled-components';
import Paragraph from '../../Paragraph';
import { Quotes, quotesTag } from '../../Quotes';

enum titles {
  signin = 'Anmelden',
  signup = 'Registrieren',
  recovery = 'Passwort vergessen',
  confirm = 'Account Bestätigen',
  change = 'Passwort ändern',
}

export const StyledSpacer = styled.div`
  padding: 10px;
  height: 1px;
`;

export const SidebarAuth = ({
  view,
  setView,
  setNotification,
  isLoading,
}: {
  isLoading: boolean;
  setNotification: React.Dispatch<
    React.SetStateAction<UserNotificationObjectType | null>
  >;
  view: AuthView;
  setView: React.Dispatch<React.SetStateAction<AuthView>>;
}) => {
  const supabase = useSupabaseClient();

  const [formData, setFormData] = useState<CredentialsData>({
    email: '',
    password: '',
  });

  const clearFields = () => {
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signIn(formData.email, formData.password).catch(error => {
      setNotification({
        message: error.message,
        type: 'error',
      });
    });
  };
  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp(formData.email, formData.password).catch(error => {
      console.error(error);
      setNotification({
        message: error.message,
        type: 'error',
      });
    });
  };

  const handleRecoverySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    recovery(formData.email).catch(error => {
      console.error(error);
      setNotification({
        message: error.message,
        type: 'error',
      });
    });
    clearFields();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNotification(null);

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let form: JSX.Element | null = null;
  let linkText: JSX.Element | null = null;

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      if (error.message.includes('User already registered')) {
        setNotification({
          message: 'Benutzer bereits registriert',
          type: 'error',
        });
        setView('signin');
        return;
      }
      throw error;
    }
    if (!data.user) {
      setNotification({
        message: `Eine E-Mail an "${email}" konnte nicht verschickt werden. Versuch es erneut`,
        type: 'error',
      });
      setView('signup');
    }
    if (data.user) {
      setView('confirm');
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setNotification({
          message: 'Benutzername oder Passwort ist falsch',
          type: 'error',
        });
        console.error(error);
        return;
      }
      if (!data.user) {
        setNotification({
          message: 'Ups... da ist etwas schief gelaufen',
          type: 'error',
        });
        console.error('No user');
        return;
      }

      if (!data.session) {
        setNotification({
          message: 'Ups... da ist etwas schief gelaufen',
          type: 'error',
        });
        console.error('No session');
        return;
      }
      if (data.session) {
        Router.push('/profile');
      }
    } catch (error) {
      console.error(error, 'in catch');
    }
  };

  const recovery = async (email: string) => {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.NEXT_PUBLIC_RECOVERY_AUTH_REDIRECT_URL,
    });
    if (error) {
      setNotification({
        message: error.message,
        type: 'error',
      });

      throw error;
    }
    if (data) {
      setNotification({
        message: `Überprüfe deine E-Mail „${email}” nach einem Link um dein Passwort zu ändern`,
        type: 'success',
      });
    }
  };

  switch (view) {
    case 'signin': {
      form = (
        <CredentialsForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSignInSubmit}
          buttonText='Einloggen'
          isSignIn={true}
        />
      );
      linkText = (
        <CredentialsSubline
          text={'Du hast noch keinen Account?'}
          aText={'Registrier dich'}
          onClick={() => setView('signup')}
        />
      );
      break;
    }
    case 'signup': {
      form = (
        <CredentialsForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSignUpSubmit}
          buttonText='Registrieren'
          isSignIn={false}
        />
      );
      linkText = (
        <CredentialsSubline
          text={'Du hast schon einen Account?'}
          aText={'Log dich ein'}
          onClick={() => setView('signin')}
        />
      );

      break;
    }
    case 'recovery': {
      form = (
        <CredentialsForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleRecoverySubmit}
          buttonText='Passwort zurücksetzen'
          isRecovery={true}
        />
      );
      linkText = (
        <CredentialsSubline
          text={'Zurück zur Anmeldung?'}
          aText={'Hier klicken'}
          onClick={() => setView('signin')}
        />
      );
      break;
    }
    case 'confirm': {
      form = (
        <Paragraph>
          Überprüfe dein E-Mail Postfach für <Quotes>{formData.email}</Quotes>{' '}
          nach einer E-Mail von{' '}
          <Quotes>{process.env.NEXT_PUBLIC_FROM_EMAIL}</Quotes> mit einem Link
          um deinen Account zu bestätigen.
        </Paragraph>
      );

      linkText = (
        <CredentialsSubline
          text={
            'Dir ist langweilig bis dahin? Dann lies etwas über Gieß den Kiez!'
          }
          aText={'Hier klicken'}
          onClick={() => Router.push('/about')}
        />
      );
    }
  }

  if (isLoading) {
    return <SidebarLoading title='Profil' />;
  }

  return (
    <>
      <SidebarTitle>{titles[view]}</SidebarTitle>
      {form}
      <div>
        {linkText}
        {view !== 'recovery' && view !== 'confirm' && (
          <>
            <StyledSpacer />
            <CredentialsSubline
              text={' Oh nein. Du hast dein '}
              aText={'Passwort vergessen?'}
              onClick={() => setView('recovery')}
            />
          </>
        )}
      </div>
    </>
  );
};
