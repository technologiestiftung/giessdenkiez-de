import React, { useState } from 'react';
import styled from 'styled-components';
import { StyledForm, StyledFormRow } from '..';
import { CredentialsData } from '../../../common/interfaces';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';
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

const StyledSpan = styled.span`
  color: ${(p) => p.theme.colorAlarm};
  font-size: ${(p) => p.theme.fontSizeL};
  padding-top: 4px;
  padding-bottom: 4px;
`;

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

  const { email, username, password } = content.auth;

  const {
    usernameTaken,
    enterEmail,
    enterPassword,
    enterUsername,
  } = content.auth.errors;

  const [showEmailHint, setShowEmailHint] = useState(false);
  const [showMissingPasswordHint, setShowMissingPasswordHint] = useState(false);
  const [showMissingUsernameHint, setShowMissingUsernameHint] = useState(false);

  return (
    <>
      <StyledForm
        noValidate
        onSubmit={(e) => {
          if (!formData.email) {
            setShowEmailHint(true);
          }
          if (!formData.username) {
            setShowMissingUsernameHint(true);
          }
          if (!formData.password) {
            setShowMissingPasswordHint(true);
          }
          if (!formData.email || !formData.username || !formData.password) {
            e.preventDefault();
            return;
          }
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
            onChange={(e) => {
              setShowEmailHint(false);
              handleInputChange(e).catch(console.error);
            }}
            value={formData.email}
          ></StyledFormTextInput>
          {showEmailHint && <StyledSpan>{enterEmail}</StyledSpan>}
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
              onChange={(e) => {
                setShowMissingUsernameHint(false);
                handleInputChange(e);
              }}
              value={formData.username}
            ></StyledFormTextInput>
            {showMissingUsernameHint && (
              <StyledSpan>{enterUsername}</StyledSpan>
            )}
            {usernamePatterns && (
              <UsernameValidation patterns={usernamePatterns} />
            )}
            {isUsernameTaken && (
              <UserNotification message={usernameTaken} type={'error'} />
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
              onChange={(e) => {
                setShowMissingPasswordHint(false);
                handleInputChange(e);
              }}
              value={formData.password}
            ></StyledFormTextInput>
            {showMissingPasswordHint && (
              <StyledSpan>{enterPassword}</StyledSpan>
            )}
            {!isRecovery && !isSignIn && (
              <PasswordValidation password={formData.password} />
            )}
          </StyledFormRow>
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
