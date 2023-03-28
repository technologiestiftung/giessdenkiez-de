import React from 'react';
import { StyledForm, StyledFormRow } from '..';
import { CredentialsData } from '../../../common/interfaces';
import ButtonSubmitRound from '../Buttons/ButtonSubmitRound';
import { StyledFormTextInput } from '../Inputs';
import { StyledLabel } from '../Labels';

export const CredentialsForm = ({
  formData,
  handleInputChange,
  handleSubmit,
  buttonText,
  isRecovery,
  isReset,
}: {
  formData: CredentialsData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  buttonText: string;
  isRecovery?: boolean;
  isReset?: boolean;
}) => {
  return (
    <>
      <StyledForm
        onSubmit={e => {
          handleSubmit(e);
        }}
      >
        {!isReset && (
          <StyledFormRow>
            <StyledLabel htmlFor='email'>
              <>E-Mail</>
            </StyledLabel>
            <StyledFormTextInput
              id='email'
              type='email'
              name='email'
              required
              onChange={handleInputChange}
              value={formData.email}
            ></StyledFormTextInput>
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
        <StyledFormRow>
          <ButtonSubmitRound type='submit'>{buttonText}</ButtonSubmitRound>
        </StyledFormRow>
      </StyledForm>
    </>
  );
};
