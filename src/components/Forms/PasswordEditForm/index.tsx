import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import React, { useEffect, useState } from 'react';
import {
  createUserNotification,
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
import { validatePassword } from '../../../utils/validatePassword';
import { Database } from '../../../common/database';

interface PasswordEditFormProps extends React.HTMLProps<HTMLElement> {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PasswordEditForm = ({
  setIsOpen,
  children,
}: PasswordEditFormProps) => {
  const supabase = useSupabaseClient<Database>();
  const session = useSession();
  const [isBeeingSaved, setIsBeeingSaved] = useState(false);

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
  useEffect(() => {
    if (!notification) {
      return;
    }

    const timeout = setTimeout(() => {
      setNotification(_ => null);
    }, 5000);
    return () => clearTimeout(timeout);
  }, [notification]);

  useEffect(() => {
    console.log('MOUNTED');

    return () => {
      console.log('UN-MOUNTED');
    };
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
    setIsBeeingSaved(true);
    const updatePassword = async () => {
      const { passwordIsValid } = validatePassword(formData.password);
      if (!passwordIsValid) {
        setNotification({
          message: 'Dein neues Passwort ist nicht sicher genug',
          type: 'error',
        });
        return;
      }

      const {
        data: verifyUserData,
        error: verifyUserError,
      } = await supabase.auth.signInWithPassword({
        email: session?.user?.email ?? '',
        password: formData.oldPassword,
      });
      if (verifyUserError) {
        setNotification(prev =>
          createUserNotification({
            dispatchedFrom: 'PasswordResetForm.handleSubmit',
            message: verifyUserError.message.includes(
              'Invalid login credentials'
            )
              ? 'Dein altes Passwort stimmt nicht'
              : verifyUserError.message,
            type: 'error',
          })
        );
        console.error('Error verifying user:', verifyUserError.message);
        return;
      }

      if (!verifyUserData) {
        setNotification(_ =>
          createUserNotification({
            message: 'Fehler beim Verifizieren des Benutzers',
            type: 'error',
          })
        );
        console.error('Error verifying user');
        return;
      }

      if (formData.password !== formData.repeatPassword) {
        setNotification(_ =>
          createUserNotification({
            dispatchedFrom:
              'PasswordResetForm.handleSubmit if (formData.password !== formData.repeatPassword)',
            message: 'Passwörter stimmen nicht überein',
            type: 'error',
          })
        );
        // FIXME: This is not working. Why?
        // WHY IS THIS NULL!!!!!
        console.log('formData', formData);
        console.log(
          'notification in if (formData.password !== formData.repeatPassword)',
          notification
        );
        console.error('Passwords do not match');
        return;
      }

      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });
      if (error) {
        setNotification(_ =>
          createUserNotification({
            message:
              'Fehler beim Ändern des Passworts. Versuch es später noch einmal.',
            type: 'error',
          })
        );
        console.error('Error updating user:', error.message);
        return;
      }
      if (data) {
        setNotification(_ =>
          createUserNotification({
            message: 'Passwort erfolgreich geändert',
            type: 'success',
          })
        );
      }
      setIsOpen(false);
    };
    updatePassword().catch(console.error);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StyledGrid>
        <StyledInputContainer>
          <StyledLabel htmlFor='oldPassword'>Altes Passwort</StyledLabel>
          <StyledFormTextInput
            id='oldPassword'
            type='password'
            name='oldPassword'
            required
            minLength={8}
            maxLength={128}
            onChange={handleInputChange}
            value={formData.oldPassword}
          ></StyledFormTextInput>
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor='password'>Neues Passwort</StyledLabel>
          <StyledFormTextInput
            id='password'
            type='password'
            name='password'
            minLength={8}
            maxLength={128}
            required
            onChange={handleInputChange}
            value={formData.password}
          ></StyledFormTextInput>
          <PasswordValidation password={formData.password} />
        </StyledInputContainer>
        <StyledInputContainer>
          <StyledLabel htmlFor='repeatPassword'>
            Neues Passwort wiederholen
          </StyledLabel>
          <StyledFormTextInput
            id='repeatPassword'
            type='password'
            name='repeatPassword'
            minLength={8}
            maxLength={128}
            required
            onChange={handleInputChange}
            value={formData.repeatPassword}
          ></StyledFormTextInput>
        </StyledInputContainer>
        {notification && <UserNotification {...notification} />}
        {children}
      </StyledGrid>
      <StyledButtonsContainer>
        <ButtonRound
          key={`cancel-password-edit`}
          width='fit-content'
          onClick={() => {
            setIsOpen(false);
            setNotification(prev => null);
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
          {isBeeingSaved ? 'Wird eingetragen ...' : 'Speichern'}
        </ButtonSubmitRound>
      </StyledButtonsContainer>
    </form>
  );
};
