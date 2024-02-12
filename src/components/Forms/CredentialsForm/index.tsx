import React from 'react';
import { StyledForm, StyledFormRow } from '..';
import { CredentialsData } from '../../../common/interfaces';
import { UsernamePattern } from '../../../utils/validateUsername';
import {
  UserNotification,
  UserNotificationObjectType,
} from '../../Notification';
import ButtonSubmitRound from '../Buttons/ButtonSubmitRound';
import { StyledFormTextInput } from '../Inputs';
import { StyledLabel } from '../Labels';
import { PasswordValidation } from '../PasswordValidation';
import { UsernameValidation } from '../UsernameValidation';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

export const CredentialsForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  buttonText,
  isRecovery,
  isSignIn,
  usernamePatterns,
  isUsernameTaken,
  currentNotification,
}: {
  formData: CredentialsData;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  handleEmailInputBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  buttonText: string;
  isRecovery?: boolean;
  isSignIn?: boolean;
  usernamePatterns?: UsernamePattern;
  isUsernameTaken?: boolean;
  currentNotification: UserNotificationObjectType | null;
}) => {
  const content = useLocalizedContent();

  const {
    signinTitle,
    email,
    username,
    password,
    signinAction,
    noAccountHint,
    registerLink,
    forgotPasswordHint,
    forgotPasswordLink,
  } = content.auth;

  return (
    <>
      <StyledForm
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <StyledFormRow>
          <StyledLabel htmlFor='email'>
            <>{email}</>
          </StyledLabel>
          <StyledFormTextInput
            id='email'
            type='email'
            name='email'
            required
            onChange={e => handleInputChange(e).catch(console.error)}
            value={formData.email}
          ></StyledFormTextInput>
        </StyledFormRow>
        {!isSignIn && !isRecovery && (
          <StyledFormRow>
            <StyledLabel htmlFor='username'>
              <>{username}</>
            </StyledLabel>
            <StyledFormTextInput
              id='username'
              type='username'
              name='username'
              required
              onChange={handleInputChange}
              value={formData.username}
            ></StyledFormTextInput>
            <StyledFormRow>
              {usernamePatterns && (
                <UsernameValidation patterns={usernamePatterns} />
              )}
            </StyledFormRow>
            {isUsernameTaken && (
              <UserNotification
                message={'Benutzername bereits vergeben'}
                type={'error'}
              />
            )}
          </StyledFormRow>
        )}
        {!isRecovery && (
          <StyledFormRow>
            <StyledLabel htmlFor='password'>
              <>{password}</>
            </StyledLabel>
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
          </StyledFormRow>
        )}
        {!isRecovery && !isSignIn && (
          <PasswordValidation password={formData.password} />
        )}
        <StyledFormRow>
          <ButtonSubmitRound type='submit'>{buttonText}</ButtonSubmitRound>
        </StyledFormRow>
        {currentNotification && (
          <StyledFormRow>
            <UserNotification
              type={currentNotification.type}
              message={currentNotification.message}
            />
          </StyledFormRow>
        )}
      </StyledForm>
    </>
  );
};
