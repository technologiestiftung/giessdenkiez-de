import React, { useEffect, useState } from 'react';
import { MapLayout } from '../src/components/MapLayout';
import { Page } from '../src/nextPage';
// import { Auth } from '@supabase/auth-ui-react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import { Database } from '../src/common/database';
type AuthView = 'signin' | 'signup' | 'recovery' | 'confirm';

interface FormData {
  email: string;
  password: string;
}
const linkStyle = {
  textDecoration: 'underline',
};

const ErrorNotifiction = ({ message }: { message: string }) => {
  return (
    <div className='error'>
      <p>{message}</p>
      <style jsx>{`
        .error {
          background: #f44336;
          color: white;
          padding: 12px;
          border-radius: 4px;

          `}</style>
    </div>
  );
};

const Auth = () => {
  const supabase = useSupabaseClient();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [view, setView] = useState<AuthView>('signin');
  const [formData, setFormData] = useState<FormData>({
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

    signIn(formData.email, formData.password).catch(error => {
      console.error(error);
      setErrorMessage(error.message);
    });
    clearFields();
  };
  const handleSignUpSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    signUp(formData.email, formData.password).catch(error => {
      console.error(error);
      setErrorMessage(error.message);
    });
    clearFields();
  };

  const handleRecoverySubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
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
    case 'signin':
      form = (
        <form onSubmit={handleSignInSubmit}>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            name='email'
            onChange={handleInputChange}
            value={formData.email}
          />
          <br />
          <label htmlFor='password'>Passwort</label>
          <input
            type='password'
            name='password'
            onChange={handleInputChange}
            value={formData.password}
          />
          <br />
          <button type='submit'>Einloggen</button>
        </form>
      );
      linkText = (
        <>
          {'Du hast noch keinen Account?'}{' '}
          <a onClick={() => setView('signup')} style={linkStyle}>
            Registrier dich{' '}
          </a>
        </>
      );
      break;
    case 'signup':
      form = (
        <form onSubmit={handleSignUpSubmit}>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            name='email'
            value={formData.email}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor='password'>Passwort</label>
          <input
            type='password'
            name='password'
            value={formData.password}
            onChange={handleInputChange}
          />
          <br />
          <button type='submit'>Registrieren</button>
        </form>
      );
      linkText = (
        <>
          {'Du hast schon einen Account?'}{' '}
          <a onClick={() => setView('signin')} style={linkStyle}>
            Log dich ein{' '}
          </a>
        </>
      );
      break;
    case 'recovery':
      form = (
        <form onSubmit={handleRecoverySubmit}>
          <label htmlFor='email'>E-Mail</label>
          <input
            type='email'
            name='email'
            onChange={handleInputChange}
            value={formData.email}
          />
          <br />
          <button type='submit'>Passwort zurücksetzen</button>
        </form>
      );
      linkText = (
        <>
          {'Zurück zur Anmeldung?'}{' '}
          <a onClick={() => setView('signin')} style={linkStyle}>
            Hier klicken{' '}
          </a>
        </>
      );
      break;
    default:
      form = null;
      linkText = null;
  }

  return (
    <>
      {form}
      <div>{errorMessage && <ErrorNotifiction message={errorMessage} />}</div>
      <div>
        <p>{linkText}</p>
        {view !== 'recovery' && (
          <p>
            Oh nein. Du hast dein{' '}
            <a onClick={() => setView('recovery')} style={linkStyle}>
              Passwort vergessen?
            </a>
          </p>
        )}
      </div>
    </>
  );
};

const ResetPasswordButton = ({
  handleClick,
}: {
  handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) => {
  return <button onClick={handleClick}> Passwort ändern?</button>;
};
const SignOut = () => {
  const supabase = useSupabaseClient();
  return (
    <>
      <button
        onClick={e => {
          e.preventDefault();
          supabase.auth.signOut().then(({ error }) => {
            if (error) throw error;
            console.log('Signed out');
          });
        }}
      >
        Ausloggen
      </button>{' '}
    </>
  );
};

const UpdateUserDataForm = () => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (session) {
      const getUserProfile = async () => {
        const { data, error } = await supabase
          .from('profiles')
          .select('id,username')
          .eq('id', session?.user?.id)
          .single();
        if (error) {
          throw error;
        }
        if (data) {
          setFormData({
            name: data.username ?? formData.email.split('@')[0],
            email: session.user?.email || '',
          });
        }
      };
      setFormData({
        name: '',
        email: session.user?.email || '',
      });
      getUserProfile().catch(console.error);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateUser = async () => {
      if (formData.email !== session?.user?.email) {
        const { data, error } = await supabase.auth.updateUser({
          email: formData.email,
        });
        if (error) {
          throw error;
        }
        if (data) {
          console.log('User updated');
        }
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('id,username')
        .eq('id', session?.user?.id)
        .single();
      if (error) {
        throw error;
      }
      if (data) {
        if (data.username !== formData.name) {
          const { data, error } = await supabase
            .from('profiles')
            .update({ username: formData.name })
            .eq('id', session?.user?.id);
          if (error) {
            throw error;
          }
          if (data) {
            console.log('User updated');
          }
          const { data: data2, error: error2 } = await supabase
            .from('trees_watered')
            .update({ username: formData.name })
            .eq('uuid', session?.user?.id);
          if (error2) {
            throw error2;
          }
          if (data2) {
            console.log('User name on trees_watered updated');
          }
        }
      }
    };
    updateUser().catch(console.error);
  };
  return (
    <>
      {session ? (
        <>
          {' '}
          <form onSubmit={handleSubmit}>
            <label htmlFor='name'>Name</label>
            <input
              type='text'
              name='name'
              onChange={handleInputChange}
              value={formData.name}
            />
            <br />
            <label htmlFor='email'>E-Mail</label>
            <input
              type='email'
              name='email'
              onChange={handleInputChange}
              value={formData.email}
            />
            <br />
            <button type='submit'>Update</button>
          </form>
        </>
      ) : null}
    </>
  );
};

const PasswordResetForm = ({
  additionalSubmitHandler,
}: {
  additionalSubmitHandler: () => void;
}) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [formData, setFormData] = useState({
    password: '',
  });
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    additionalSubmitHandler();
    const updatePassword = async () => {
      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });
      if (error) {
        throw error;
      }
      if (data) {
        console.log('Password updated');
      }
    };
    updatePassword().catch(console.error);
  };
  return (
    <>
      <div>
        <p>Passwort zurücksetzen für {session?.user?.email}</p>
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor='password'>Neues Passwort</label>
        <input
          type='password'
          name='password'
          minLength={8}
          maxLength={128}
          // https://stackoverflow.com/a/21456918
          // pattern={
          //   '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,10}$'
          // }
          required
          value={formData.password}
          onChange={handleInputChange}
        />
        <br />
        <button type='submit'>Speichern</button>
      </form>
    </>
  );
};

const AuthPage: Page = () => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [showPasswordResetScreen, setShowPasswordResetScreen] = useState(false);

  useEffect(() => {
    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      switch (event) {
        case 'SIGNED_IN':
          console.log('SIGNED_IN', session);
          break;
        case 'SIGNED_OUT':
          console.log('SIGNED_OUT');
          break;
        case 'USER_UPDATED':
          console.log('USER_UPDATED', session?.user);
          break;
        case 'PASSWORD_RECOVERY':
          console.log('PASSWORD_RECOVERY', session);

          // show screen to update user's password
          setShowPasswordResetScreen(true);
          break;
        case 'TOKEN_REFRESHED':
          console.log('TOKEN_REFRESHED', session);
          break;
        case 'USER_DELETED':
          console.log('USER_DELETED');
          break;
        default:
          console.log('UNKNOWN_EVENT', event);
          throw new Error('Unknown event type');
      }
    });

    return () => {
      authListener?.unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('Session', session);
  }, [session]);
  if (showPasswordResetScreen) {
    return (
      <>
        {' '}
        <PasswordResetForm
          additionalSubmitHandler={() => {
            setShowPasswordResetScreen(false);
          }}
        />
      </>
    );
  }
  return (
    <>
      <h1>Auth</h1>
      {!session ? (
        <Auth />
      ) : (
        <>
          <UpdateUserDataForm />
          <ResetPasswordButton
            handleClick={e => {
              e.preventDefault();
              setShowPasswordResetScreen(true);
            }}
          />

          <SignOut />
          <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
            <code>{JSON.stringify(session, null, 2)}</code>
          </pre>
        </>
      )}
    </>
  );
};
AuthPage.layout = MapLayout;

export default AuthPage;
