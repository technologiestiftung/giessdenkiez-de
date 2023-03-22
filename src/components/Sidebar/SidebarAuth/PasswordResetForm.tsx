import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import SmallParagraph from '../../SmallParagraph';
import SidebarTitle from '../SidebarTitle';
import { CredentialsForm, CredentialsSubline } from './Form';

export const PasswordResetForm = ({
  additionalSubmitHandler,
  returnClickHandler,
}: {
  additionalSubmitHandler: () => void;
  returnClickHandler: () => void;
}) => {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [formData, setFormData] = useState({
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
      <SidebarTitle>Passwort ändern?</SidebarTitle>
      <SmallParagraph>für {session?.user?.email}</SmallParagraph>
      <CredentialsForm
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        buttonText='Speichern'
        isReset={true}
      />
      <CredentialsSubline
        text={'Zurück zur Anmeldung?'}
        aText={'Hier klicken'}
        onClick={returnClickHandler}
      />
    </>
  );
};
