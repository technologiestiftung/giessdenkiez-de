import React from 'react';
import styled from 'styled-components';
import { CredentialsData, ResetCredentialsData } from './index';
import ButtonSubmitRound from '../../ButtonRound/ButtonSubmitRound';
import { StyledComponentType } from '../../../common/interfaces';
import SmallParagraph from '../../SmallParagraph';

export const SidebarSubTitle = styled.span<StyledComponentType>`
  font-size: ${p => p.theme.fontSizeXl};
  font-weight: bold;
  padding: 8px 0;
`;
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
    <SmallParagraph>
      <span>{text}</span>
      <br />
      <StyledA onClick={onClick}>{aText}</StyledA>
    </SmallParagraph>
  );
};

export const ResetCredentialsForm = ({
  formData,
  handleInputChange,
  handleSubmit,
}: {
  formData: ResetCredentialsData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      {' '}
      <StyledForm
        onSubmit={e => {
          console.log('submitting');
          handleSubmit(e);
        }}
      >
        <StyledFormRow>
          <StyledFormLabel htmlFor='oldPassword'>
            {' '}
            <SmallParagraph>Altes Passwort</SmallParagraph>
          </StyledFormLabel>
          <StyledFormTextInput
            type='password'
            name='oldPassword'
            minLength={8}
            maxLength={128}
            onChange={handleInputChange}
            value={formData.oldPassword}
          ></StyledFormTextInput>
        </StyledFormRow>
        <StyledFormRow>
          <StyledFormLabel htmlFor='password'>
            {' '}
            <SmallParagraph>Neues Passwort</SmallParagraph>
          </StyledFormLabel>
          <StyledFormTextInput
            type='password'
            name='password'
            minLength={8}
            maxLength={128}
            onChange={handleInputChange}
            value={formData.password}
          ></StyledFormTextInput>
        </StyledFormRow>
        <StyledFormRow>
          <StyledFormLabel htmlFor='repeatPassword'>
            {' '}
            <SmallParagraph>Neues Passwort wiederholen</SmallParagraph>
          </StyledFormLabel>
          <StyledFormTextInput
            type='password'
            name='repeatPassword'
            minLength={8}
            maxLength={128}
            onChange={handleInputChange}
            value={formData.repeatPassword}
          ></StyledFormTextInput>
        </StyledFormRow>
        <StyledFormRow>
          <ButtonSubmitRound type='submit'>Speichern</ButtonSubmitRound>
        </StyledFormRow>
      </StyledForm>
    </>
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
            <StyledFormLabel htmlFor='email'>
              {' '}
              <SmallParagraph>E-Mail</SmallParagraph>
            </StyledFormLabel>
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
            <StyledFormLabel htmlFor='password'>
              {' '}
              <SmallParagraph>Passwort</SmallParagraph>
            </StyledFormLabel>
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
