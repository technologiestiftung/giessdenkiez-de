import React, { useEffect, useState } from 'react';
import { StyledForm, StyledFormRow } from '..';
import { CredentialsData } from '../../../common/interfaces';
import { UsernamePattern } from '../../../utils/validateUsername';
import { UserNotification } from '../../Notification';
import ButtonSubmitRound from '../Buttons/ButtonSubmitRound';
import { StyledFormTextInput } from '../Inputs';
import { StyledLabel } from '../Labels';
import { PasswordValidation } from '../PasswordValidation';
import { UsernameValidation } from '../UsernameValidation';

export const CredentialsForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  buttonText,
  isRecovery,
  isSignIn,
  usernamePatterns,
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
}) => {
  const [notTaken, setNotTaken] = useState<boolean | undefined>(true);

  useEffect(() => {
    setNotTaken(usernamePatterns?.notTaken);
  }, [usernamePatterns?.notTaken]);

  return (
    <>
      <StyledForm
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        <StyledFormRow>
          <StyledLabel htmlFor='email'>
            <>E-Mail</>
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
              <>Benutzername</>
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
            {!notTaken && (
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
              <>Passwort</>
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
      </StyledForm>
    </>
  );
};
