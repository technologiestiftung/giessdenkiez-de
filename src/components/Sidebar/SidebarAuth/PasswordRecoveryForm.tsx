import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import { CredentialsData } from '.';
import SidebarTitle from '../SidebarTitle';
import {
  CredentialsSubline,
  RecoverCredentialsForm,
  SidebarSubTitle,
} from '../../Forms';
import { UserNotificationObjectType } from './Notification';

export const PasswordRecoveryForm = ({
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
  const [formData, setFormData] = useState<CredentialsData>({
    password: '',
    email: '',
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
      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });
      if (error) {
        setNotification({
          message: error.message,
          type: 'error',
        });
        console.error('Error updating user:', error.message);
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
      <SidebarTitle>Passwort ändern</SidebarTitle>
      <SidebarSubTitle>für: {session?.user?.email}</SidebarSubTitle>
      <RecoverCredentialsForm
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
