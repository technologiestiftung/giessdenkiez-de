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
import { PasswordValidation } from '../PasswordValidation';
import { validatePassword } from '../../../utils/validatePassword';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

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
  const content = useLocalizedContent();
  const { newPasswordTitle } = content.sidebar.account;

  const {
    passwordNotSecureEnough,
    passwordCouldNotBeChanged,
    passwordChangeSuccess,
    changePasswordFor,
    backToLogin,
  } = content.auth;

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
      const { isPasswordValid } = validatePassword(formData.password);

      if (!isPasswordValid) {
        setNotification({
          message: passwordNotSecureEnough,
          type: 'error',
        });
        return;
      }

      const { data, error } = await supabase.auth.updateUser({
        password: formData.password,
      });
      if (error) {
        setNotification({
          message: passwordCouldNotBeChanged,
          type: 'error',
        });
        console.error('Error updating user:', error.message);
        return;
      }
      if (data) {
        setNotification({
          message: passwordChangeSuccess,
          type: 'success',
        });
        additionalSubmitHandler();
      }
    };
    updatePassword().catch(console.error);
  };
  return (
    <>
      <SidebarTitle>{changePasswordFor}</SidebarTitle>
      <CredentialValue> {session?.user?.email}</CredentialValue>
      <SidebarSubTitle></SidebarSubTitle>
      <>
        <StyledForm onSubmit={handleSubmit}>
          <StyledFormRow>
            <StyledLabel htmlFor='password'>
              <>{newPasswordTitle}</>
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
          </StyledFormRow>

          <StyledFormRow>
            <ButtonSubmitRound type='submit'>
              {content.sidebar.account.editSave}
            </ButtonSubmitRound>
          </StyledFormRow>
        </StyledForm>
      </>
      <CredentialsSubline
        text={backToLogin}
        aText={content.auth.clickHere}
        onClick={returnClickHandler}
      />
    </>
  );
};
