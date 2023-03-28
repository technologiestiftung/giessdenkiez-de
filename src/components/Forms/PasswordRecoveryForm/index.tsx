import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import React, { useState } from 'react';
import SidebarTitle from '../../Sidebar/SidebarTitle';
import {
  CredentialsSubline,
  SidebarSubTitle,
  StyledForm,
  StyledFormRow,
} from '../index';
import { UserNotificationObjectType } from '../../Notification';
import ButtonSubmitRound from '../Buttons/ButtonSubmitRound';
import { StyledFormTextInput } from '../Inputs';
import { StyledLabel } from '../Labels';
import { CredentialsData } from '../../../common/interfaces';
import { CredentialValue } from '../../UserCredentials';

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
      <SidebarTitle>Passwort ändern für</SidebarTitle>
      <CredentialValue> {session?.user?.email}</CredentialValue>
      <SidebarSubTitle></SidebarSubTitle>
      <>
        <StyledForm
          onSubmit={e => {
            handleSubmit(e);
          }}
        >
          <StyledFormRow>
            <StyledLabel htmlFor='password'>
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
          </StyledFormRow>
          <StyledFormRow>
            <ButtonSubmitRound type='submit'>Speichern</ButtonSubmitRound>
          </StyledFormRow>
        </StyledForm>
      </>
      <CredentialsSubline
        text={'Zurück zur Anmeldung?'}
        aText={'Hier klicken'}
        onClick={returnClickHandler}
      />
    </>
  );
};