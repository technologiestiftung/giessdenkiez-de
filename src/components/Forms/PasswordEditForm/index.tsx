import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react';
import {
  createUserNotifiction,
  UserNotification,
  UserNotificationObjectType,
} from '../../Notification';
import ButtonRound from '../../ButtonRound';
import ButtonSubmitRound from '../Buttons/ButtonSubmitRound';
import { StyledFormTextInput } from '../Inputs';
import { StyledLabel } from '../Labels';
import { ResetCredentialsData } from '../../../common/interfaces';
import {
  StyledButtonsContainer,
  StyledGrid,
  StyledInputContainer,
} from '../AccountEditForm';
import { PasswordValidation } from '../PasswordValidation';

export const PasswordEditForm = ({
  setIsOpen,
  isOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [formData, setFormData] = useState<ResetCredentialsData>({
    password: '',
    email: '',
    repeatPassword: '',
    oldPassword: '',
  });
  const [
    notification,
    setNotification,
  ] = useState<UserNotificationObjectType | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setNotification(null);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&*()!_\-=":;])[A-Za-z\d@#$%^&*()!_\-=:;]{8,}$/;
    const isValid = pattern.test(formData.password);
    if (!isValid) {
      setNotification({
        message: 'Passwort ist nicht sicher genug',
        type: 'error',
      });
      return;
    }

    const updatePassword = async () => {
      const {
        data: verifyUserData,
        error: verifyUserError,
      } = await supabase.auth.signInWithPassword({
        email: session?.user?.email ?? '',
        password: formData.oldPassword,
      });
      if (verifyUserError) {
        setNotification(
          createUserNotifiction({
            dispatchedFrom: 'PasswordResetForm.handleSubmit',
            message: verifyUserError.message.includes(
              'Invalid login credentials'
            )
              ? 'Falsches Passwort'
              : verifyUserError.message,
            type: 'error',
          })
        );
        console.error('Error verifying user:', verifyUserError.message);
        return;
      }
      if (!verifyUserData) {
        setNotification({
          message: 'Fehler beim Verifizieren des Benutzers',
          type: 'error',
        });
        console.error('Error verifying user');
        return;
      }
      if (formData.password !== formData.repeatPassword) {
        setNotification({
          message: 'Passwörter stimmen nicht überein',
          type: 'error',
        });
        return;
      }
      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });
      if (error) {
        setNotification({
          message: error.message,
          type: 'error',
        });
        console.log('Error updating user:', error.message);
      }
      if (data) {
        setNotification({
          message: 'Passwort erfolgreich geändert',
          type: 'success',
        });
      }
    };
    updatePassword().catch(console.error);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setNotification(null);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [notification]);

  return (
    <>
      <>
        <form
          onSubmit={e => {
            console.log('submitting');
            handleSubmit(e);
          }}
        >
          <StyledGrid>
            <StyledInputContainer>
              <StyledLabel htmlFor='oldPassword'>
                {' '}
                <>Altes Passwort</>
              </StyledLabel>
              <StyledFormTextInput
                id='oldPassword'
                type='password'
                name='oldPassword'
                minLength={8}
                maxLength={128}
                onChange={handleInputChange}
                value={formData.oldPassword}
              ></StyledFormTextInput>
            </StyledInputContainer>
            <StyledInputContainer>
              <StyledLabel htmlFor='password'>
                {' '}
                <>Neues Passwort</>
              </StyledLabel>
              <StyledFormTextInput
                id='password'
                type='password'
                name='password'
                minLength={8}
                maxLength={128}
                onChange={handleInputChange}
                value={formData.password}
              ></StyledFormTextInput>
              <PasswordValidation password={formData.password} />
            </StyledInputContainer>
            <StyledInputContainer>
              <StyledLabel htmlFor='repeatPassword'>
                {' '}
                <>Neues Passwort wiederholen</>
              </StyledLabel>
              <StyledFormTextInput
                id='repeatPassword'
                type='password'
                name='repeatPassword'
                minLength={8}
                maxLength={128}
                onChange={handleInputChange}
                value={formData.repeatPassword}
              ></StyledFormTextInput>
              {notification && <UserNotification {...notification} />}
            </StyledInputContainer>
          </StyledGrid>
          <StyledButtonsContainer>
            <ButtonRound
              key={`cancel-password-edit`}
              width='fit-content'
              onClick={() => {
                setIsOpen(false);
              }}
            >
              Abbrechen
            </ButtonRound>
            <ButtonSubmitRound
              key={`save-password-edit`}
              width='fit-content'
              type='submit'
              colorType='primary'
            >
              Speichern
            </ButtonSubmitRound>
          </StyledButtonsContainer>
        </form>
      </>
    </>
  );
};
