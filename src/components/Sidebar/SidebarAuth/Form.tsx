import React from 'react';
import styled from 'styled-components';
import { CredentialsData } from './index';
import ButtonSubmitRound from '../../ButtonRound/ButtonSubmitRound';

export const StyledH1 = styled.h1`
  font-size: 1.5rem;
  font-weight: 500;
  margin: 0;
`;
export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const StyledFormLabel = styled.label``;

export const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: 10px;
`;

export const StyledFormTextInput = styled.input`
  flex: 1;
  padding: 10px;
  margin-top: 8px;
  border-radius: 4px;
  border: 1px solid ${p => p.theme.colorTextMedium};
  color: ${p => p.theme.colorTextDark};
  &::selection {
    background: ${p => p.theme.colorPrimary};
    color: white;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }
`;

const StyledA = styled.a`
  text-decoration: underline;
`;

export const CredentialsSubline = ({
  text,
  aText,
  onClick,
}: {
  text: string;
  aText: string;
  onClick: () => void;
}) => {
  return (
    <p>
      <span>{text}</span>
      <br />
      <StyledA onClick={onClick}>{aText}</StyledA>
    </p>
  );
};

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
          console.log('submitting');
          handleSubmit(e);
        }}
      >
        {!isReset && (
          <StyledFormRow>
            <StyledFormLabel htmlFor='email'>Email</StyledFormLabel>
            <StyledFormTextInput
              type='email'
              name='email'
              onChange={handleInputChange}
              value={formData.email}
            ></StyledFormTextInput>
          </StyledFormRow>
        )}
        {!isRecovery && (
          <StyledFormRow>
            <StyledFormLabel htmlFor='password'>Password</StyledFormLabel>
            <StyledFormTextInput
              type='password'
              name='password'
              minLength={8}
              maxLength={128}
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
