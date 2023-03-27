import React from 'react';
import styled from 'styled-components';
import {
  CredentialsData,
  ResetCredentialsData,
} from '../Sidebar/SidebarAuth/index';
import ButtonSubmitRound from './Buttons/ButtonSubmitRound';
import { StyledComponentType } from '../../common/interfaces';
import { StyledFormTextInput } from './Inputs';
import { StyledFormLabel, StyledLabel } from './Labels';
import SmallParagraph from '../SmallParagraph';

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

export const StyledFormRow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  padding: 10px;
`;

export const StyledA = styled.a`
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
          <StyledLabel htmlFor='oldPassword'>
            {' '}
            <>Altes Passwort</>
          </StyledLabel>
          <StyledFormTextInput
            id='oldPassword'
            type='password'
            name='oldPassword'
            minLength={8}
            maxLength={128}
            onChange={handleInputChange}
            value={formData.oldPassword}
          ></StyledFormTextInput>
        </StyledFormRow>
        <StyledFormRow>
          <StyledLabel htmlFor='password'>
            {' '}
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
          <StyledLabel htmlFor='repeatPassword'>
            {' '}
            <>Neues Passwort wiederholen</>
          </StyledLabel>
          <StyledFormTextInput
            id='repeatPassword'
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

export const RecoverCredentialsForm = ({
  formData,
  handleInputChange,
  handleSubmit,
}: {
  formData: CredentialsData;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <>
      {' '}
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
            <StyledLabel htmlFor='email'>
              <>E-Mail</>
            </StyledLabel>
            <StyledFormTextInput
              id='email'
              type='email'
              name='email'
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
