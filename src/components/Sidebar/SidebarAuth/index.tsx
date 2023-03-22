import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import { AuthView } from '../../../../pages/auth';
import SidebarTitle from '../SidebarTitle';
import { UserNotification } from './Notification';
import { CredentialsForm, CredentialsSubline } from './Form';
export interface CredentialsData {
  email: string;
  password: string;
}
const linkStyle = {
  textDecoration: 'underline',
};

enum titles {
  signin = 'Anmelden',
  signup = 'Registrieren',
  recovery = 'Passwort vergessen',
  confirm = 'Account Bestätigen',
  change = 'Passwort ändern',
}

export const SidebarAuth = ({
  view,
  setView,
}: {
  view: AuthView;
  setView: React.Dispatch<React.SetStateAction<AuthView>>;
}) => {
  const supabase = useSupabaseClient();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const [view, setView] = useState<AuthView>('signin');
  const [formData, setFormData] = useState<CredentialsData>({
    email: '',
    password: '',
  });

  const clearFields = () => {
    setErrorMessage(null);
    setFormData({
      email: '',
      password: '',
    });
  };

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('signin');

    signIn(formData.email, formData.password).catch(error => {
      console.error(error);
      setErrorMessage(error.message);
    });
    clearFields();
  };
  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('signup');
    signUp(formData.email, formData.password).catch(error => {
      console.error(error);
      setErrorMessage(error.message);
    });
    clearFields();
  };

  const handleRecoverySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('recovery');
    recovery(formData.email).catch(error => {
      console.error(error);
      setErrorMessage(error.message);
    });
    clearFields();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setErrorMessage(null);
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
        setErrorMessage('User already registered');
        console.error('User already registered');
        setView('signin');
        return;
      }
      throw error;
    }
    if (data.user) {
      setErrorMessage('Check your email for the link!');
      // console.log('Autoconfirm is not active');
      setView('confirm');
    }
    if (data.session) {
      console.log('Session', data.session);
      console.log('Autoconfirm is active');
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setErrorMessage(error.message);
      console.error(error);
      throw error;
    }
    if (!data.user) {
      setErrorMessage('500 - Internal Server Error');
      throw new Error('No user');
    }

    if (!data.session) {
      setErrorMessage('500 - Internal Server Error');
      throw new Error('No session');
    }
  };

  const recovery = async (email: string) => {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'http://localhost:3000/auth',
    });
    if (error) {
      setErrorMessage(error.message);
      throw error;
    }
    if (data) {
      setErrorMessage('Check your email for the link!');
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

    default:
      form = null;
      linkText = null;
  }

  return (
    <>
      <SidebarTitle>{titles[view]}</SidebarTitle>
      {form}
      <div>{errorMessage && <UserNotification message={errorMessage} />}</div>
      <div>
        <p>{linkText}</p>
        {view !== 'recovery' && (
          <CredentialsSubline
            text={' Oh nein. Du hast dein '}
            aText={'Passwort vergessen?'}
            onClick={() => setView('recovery')}
          />
        )}
      </div>
    </>
  );
};
