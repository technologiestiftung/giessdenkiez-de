import { useSession } from '@supabase/auth-helpers-react';
import React, { FC, useState } from 'react';
import {
  UserNotification,
  UserNotificationObjectType,
  UserNotificationSpacer,
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
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

interface PasswordEditFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export const PasswordEditForm: FC<PasswordEditFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const content = useLocalizedContent();
  const {
    oldPasswordTitle,
    newPasswordTitle,
    repeatNewPasswordTitle,
    editClose,
    editSave,
    editSaving,
  } = content.sidebar.account;

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
          <StyledLabel htmlFor='oldPassword'>{oldPasswordTitle}</StyledLabel>
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
          <StyledLabel htmlFor='password'>{newPasswordTitle}</StyledLabel>
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
            {repeatNewPasswordTitle}
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
        {notification ? (
          <UserNotification {...notification} />
        ) : (
          <UserNotificationSpacer />
        )}
      </StyledGrid>
      <StyledButtonsContainer>
        <ButtonRound
          key={`cancel-password-edit`}
          width='fit-content'
          onClick={onCancel}
        >
          {editClose}
        </ButtonRound>
        <ButtonSubmitRound
          key={`save-password-edit`}
          width='fit-content'
          type='submit'
          $colorType='primary'
        >
          {isBeeingSaved ? editSaving : editSave}
        </ButtonSubmitRound>
      </StyledButtonsContainer>
    </form>
  );
};
