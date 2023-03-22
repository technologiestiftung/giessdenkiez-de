import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import React, { useState, useEffect } from 'react';
import { Database } from '../../../common/database';
import ButtonSubmitRound from '../../ButtonRound/ButtonSubmitRound';
import SidebarTitle from '../SidebarTitle';
import {
  StyledForm,
  StyledFormLabel,
  StyledFormRow,
  StyledFormTextInput,
} from './Form';
import { UserNotification } from './Notification';

export const UpdateUserDataForm = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
          setErrorMessage(error.message);
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
    console.log('Update');

    const updateUser = async () => {
      if (formData.name.length < 3) {
        setErrorMessage('Der Benutzername muss mindestens 3 Zeichen lang sein');
        return;
      }
      if (formData.email !== session?.user?.email) {
        const { data, error } = await supabase.auth.updateUser({
          email: formData.email,
        });
        if (error) {
          setErrorMessage(error.message);
          throw error;
        }
        if (data) {
          setMessage('E-Mail geändert');
        }
      }
      const { data, error } = await supabase
        .from('profiles')
        .select('id,username')
        .eq('id', session?.user?.id)
        .single();
      if (error) {
        setErrorMessage(error.message);
        throw error;
      }
      if (data) {
        if (data.username !== formData.name) {
          const { data, error } = await supabase
            .from('profiles')
            .update({ username: formData.name })
            .eq('id', session?.user?.id)
            .select();
          if (error) {
            setErrorMessage(error.message);
            throw error;
          }
          if (data) {
            setMessage('Benutzername geändert');
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
          <SidebarTitle>Account bearbeiten</SidebarTitle>

          <StyledForm onSubmit={handleSubmit}>
            <StyledFormRow>
              <StyledFormLabel htmlFor='name'>Name</StyledFormLabel>
              <StyledFormTextInput
                type='text'
                name='name'
                minLength={3}
                maxLength={20}
                onChange={handleInputChange}
                value={formData.name}
              />
            </StyledFormRow>
            <StyledFormRow>
              <StyledFormLabel htmlFor='email'>E-Mail</StyledFormLabel>
              <StyledFormTextInput
                type='email'
                name='email'
                onChange={handleInputChange}
                value={formData.email}
              />
            </StyledFormRow>
            <StyledFormRow>
              <ButtonSubmitRound type='submit'>
                Update Account
              </ButtonSubmitRound>
            </StyledFormRow>
          </StyledForm>
          {message && <UserNotification message={message} type='success' />}
          {errorMessage && (
            <UserNotification message={errorMessage} type='error' />
          )}
        </>
      ) : null}
    </>
  );
};
