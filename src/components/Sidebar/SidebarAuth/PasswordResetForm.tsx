import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import { ResetCredentialsData } from '.';
import SmallParagraph from '../../SmallParagraph';
import SidebarTitle from '../SidebarTitle';
import { CredentialsSubline, ResetCredentialsForm } from './Form';
import {
  createUserNotifiction,
  UserNotificationObjectType,
} from './Notification';

export const PasswordResetForm = ({
  additionalSubmitHandler,
  returnClickHandler,
  setNotification,
}: {
  additionalSubmitHandler: () => void;
  returnClickHandler: () => void;
  setNotification: React.Dispatch<
    React.SetStateAction<UserNotificationObjectType | null>
  >;
}) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [formData, setFormData] = useState<ResetCredentialsData>({
    password: '',
    email: '',
    repeatPassword: '',
    oldPassword: '',
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
        additionalSubmitHandler();
      }
    };
    updatePassword().catch(console.error);
  };
  return (
    <>
      <SidebarTitle>Passwort ändern?</SidebarTitle>
      <SmallParagraph>für {session?.user?.email}</SmallParagraph>
      <ResetCredentialsForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <CredentialsSubline
        text={'Zurück zur Anmeldung?'}
        aText={'Hier klicken'}
        onClick={returnClickHandler}
      />
    </>
  );
};
