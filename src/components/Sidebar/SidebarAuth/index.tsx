import { useSupabaseClient } from '@supabase/auth-helpers-react';
import debounce from 'lodash/debounce';
import Router from 'next/router';
import React, { useState } from 'react';
import styled from 'styled-components';
import { CredentialsData } from '../../../common/interfaces';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';
import { validatePassword } from '../../../utils/validatePassword';
import {
  UsernamePattern,
  validateUsername,
} from '../../../utils/validateUsername';
import { CredentialsSubline } from '../../Forms';
import { AuthView } from '../../Forms/AuthForm';
import { CredentialsForm } from '../../Forms/CredentialsForm';
import { UserNotificationObjectType } from '../../Notification';
import Paragraph from '../../Paragraph';
import { SidebarLoading } from '../SidebarLoading';
import SidebarTitle from '../SidebarTitle';

export const StyledSpacer = styled.div`
  padding: 10px;
  height: 1px;
`;

export const SidebarAuth = ({
  view,
  setView,
  currentNotification,
  setNotification,
  isLoading,
}: {
  isLoading: boolean;
  currentNotification: UserNotificationObjectType | null;
  setNotification: React.Dispatch<
    React.SetStateAction<UserNotificationObjectType | null>
  >;
  view: AuthView;
  setView: React.Dispatch<React.SetStateAction<AuthView>>;
}) => {
  const content = useLocalizedContent();

  const {
    signinTitle,
    signupTitle,
    signinAction,
    signupAction,
    noAccountHint,
    registerLink,
    forgotPasswordLink,
    forgotPasswordHint,
    checkSignupMail,
  } = content.auth;

  const {
    checkUsername,
    userExistsAlready,
    emailCouldNotBeSent,
    usernameOrPasswordWrong,
    ooops,
    checkMailForPasswordReset,
    checkPassword,
  } = content.auth.errors;

  const {
    resetPassword,
    backToLogin,
    clickHere,
    bored,
    profile,
    alreadyRegisteredHint,
    alreadyRegisteredAction,
  } = content.auth;

  const { confirm, editPasswordTitle } = content.sidebar.account;

  const titles = {
    signin: signinTitle,
    signup: signupTitle,
    recovery: forgotPasswordLink,
    confirm: confirm,
    change: editPasswordTitle,
  };

  const supabase = useSupabaseClient();

  const [formData, setFormData] = useState<CredentialsData>({
    email: '',
    password: '',
    username: '',
  });

  const [usernamePatterns, setUsernamePatterns] = useState<UsernamePattern>({
    allowedCharacters: false,
    allowedLength: false,
  });

  const [isUsernameTaken, setIsUsernameTaken] = useState<boolean>(false);

  const clearFields = () => {
    setFormData({
      email: '',
      password: '',
      username: '',
    });
  };

  const handleSignInSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signIn(formData.email, formData.password).catch((error) => {
      setNotification({
        message: error.message,
        type: 'error',
      });
    });
  };
  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    signUp(formData).catch((error) => {
      console.error(error);
      setNotification({
        message: error.message,
        type: 'error',
      });
    });
  };

  const handleRecoverySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    recovery(formData.email).catch((error) => {
      console.error(error);
      setNotification({
        message: error.message,
        type: 'error',
      });
    });
    clearFields();
  };

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    if (name === 'username') {
      // make a throttled request to the api to check if the username is available
      // if not, show a message
      const { patterns } = validateUsername(value);
      setUsernamePatterns(patterns);
      await checkIfUsernameIsNotTaken(value, setIsUsernameTaken);
    }
    setNotification(null);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  let form: JSX.Element | null = null;
  let linkText: JSX.Element | null = null;

  const signUp = async ({ email, password, username }: CredentialsData) => {
    if (username === undefined) {
      setNotification({
        message: checkUsername,
        type: 'error',
      });
      return;
    }

    const { isUsernameValid } = validateUsername(username);

    if (!isUsernameValid) {
      setNotification({
        message: checkUsername,
        type: 'error',
      });
      return;
    }

    const { isPasswordValid } = validatePassword(password);

    if (!isPasswordValid) {
      setNotification({
        message: checkPassword,
        type: 'error',
      });
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          signup_username: username,
        },
      },
    });

    if (error) {
      console.error('SIGNUP ERROR', error);
      if (error.message.includes('User already registered')) {
        setNotification({
          message: userExistsAlready,
          type: 'error',
        });
        setView('signin');
        return;
      }
      throw error;
    }

    if (!data.user) {
      setNotification({
        message: emailCouldNotBeSent(email),
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
          message: usernameOrPasswordWrong,
          type: 'error',
        });
        console.error(error);
        return;
      }
      if (!data.user) {
        setNotification({
          message: ooops,
          type: 'error',
        });
        console.error('No user');
        return;
      }

      if (!data.session) {
        setNotification({
          message: ooops,
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
        message: checkMailForPasswordReset(email),
        type: 'success',
      });
    }
  };

  const checkIfUsernameIsNotTaken = debounce(
    async (
      username: string,
      setIsUsernameTaken: React.Dispatch<React.SetStateAction<boolean>>
    ): Promise<void> => {
      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username);

      if (error) {
        console.error(error);
        return;
      }

      if (!data) {
        throw new Error('could not check username');
      }

      if (data.length > 0) {
        setIsUsernameTaken(true);
        return;
      }

      setIsUsernameTaken(false);
    },
    500
  );

  switch (view) {
    case 'signin': {
      form = (
        <CredentialsForm
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSignInSubmit}
          buttonText={signinAction}
          isSignIn={true}
          currentNotification={currentNotification}
        />
      );
      linkText = (
        <CredentialsSubline
          text={noAccountHint}
          aText={registerLink}
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
          buttonText={signupAction}
          usernamePatterns={usernamePatterns}
          isUsernameTaken={isUsernameTaken}
          currentNotification={currentNotification}
          isSignIn={false}
        />
      );
      linkText = (
        <CredentialsSubline
          text={alreadyRegisteredHint}
          aText={alreadyRegisteredAction}
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
          buttonText={resetPassword}
          isRecovery={true}
          currentNotification={currentNotification}
        />
      );
      linkText = (
        <CredentialsSubline
          text={backToLogin}
          aText={clickHere}
          onClick={() => setView('signin')}
        />
      );
      break;
    }
    case 'confirm': {
      form = (
        <Paragraph>
          {checkSignupMail(
            formData.email,
            process.env.NEXT_PUBLIC_FROM_EMAIL ?? ''
          )}
        </Paragraph>
      );

      linkText = (
        <CredentialsSubline
          text={bored}
          aText={clickHere}
          onClick={() => Router.push('/about')}
        />
      );
    }
  }

  if (isLoading) {
    return <SidebarLoading title={profile} />;
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
              text={forgotPasswordHint}
              aText={forgotPasswordLink}
              onClick={() => setView('recovery')}
            />
          </>
        )}
      </div>
    </>
  );
};
