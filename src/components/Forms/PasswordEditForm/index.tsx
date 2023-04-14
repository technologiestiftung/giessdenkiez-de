import { useSession } from '@supabase/auth-helpers-react';
import React, { FC, useState } from 'react';
import {
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
import { updatePassword } from '../../../utils/requests/updatePassword';

interface PasswordEditFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const PasswordEditForm: FC<PasswordEditFormProps> = ({
  onSuccess,
  onCancel,
}) => {
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

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsBeeingSaved(true);

    try {
      const successMessage = await updatePassword({
        currentSession: session,
        oldPassword: formData.oldPassword,
        newPassword: formData.password,
        newPasswordConfirmation: formData.repeatPassword,
      });

      successMessage && onSuccess();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setNotification({
        message: errorMessage,
        type: 'error',
      });
      setIsBeeingSaved(false);
    }
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
      </StyledGrid>
      <StyledButtonsContainer>
        <ButtonRound
          key={`cancel-password-edit`}
          width='fit-content'
          onClick={onCancel}
        >
          Schließen
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
