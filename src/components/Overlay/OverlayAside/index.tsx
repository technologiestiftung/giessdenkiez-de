import React from 'react';
import styled from 'styled-components';
import AuthForm from '../../Forms/AuthForm';

const OverlayAsideWrapper = styled.div`
  grid-area: aside;
  background-color: rgba(0, 0, 0, 0.02);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  padding: 27px 24px;
  overflow-y: auto;

  @media screen and (max-width: ${p => p.theme.screens.tablet}) {
    padding-inline: 40px;
    overflow-y: initial;
  }
`;

const FormContainer = styled.div`
  max-width: 320px;
`;

export const OverlayAside = () => (
  <OverlayAsideWrapper>
    <FormContainer>
      <AuthForm />
    </FormContainer>
  </OverlayAsideWrapper>
);
