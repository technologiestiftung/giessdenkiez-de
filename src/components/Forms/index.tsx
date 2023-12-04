import React from 'react';
import styled from 'styled-components';
import { StyledComponentType } from '../../common/interfaces';
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
