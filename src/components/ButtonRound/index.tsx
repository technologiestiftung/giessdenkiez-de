import React, { FC, MouseEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { ThemeType } from '../../assets/theme';

interface StyledButtonProps {
  width?: string;
  $buttonType?: 'primary' | 'secondary' | 'cta';
  margin?: string;
  fontSize?: string;
  disabled?: boolean;
  theme: ThemeType;
}
const StyledButton = styled.button<StyledButtonProps>`
  width: ${p => (p.width !== undefined ? p.width : '-webkit-fill-available')};
  border-radius: 100px;
  background-color: ${p => {
    if (p.disabled) return p.theme.colorLightGray;
    if (p.$buttonType === 'primary') return p.theme.colorPrimaryVeryLight;
    if (p.$buttonType === 'secondary') return p.theme.colorWhite;
    if (p.$buttonType === 'cta') return p.theme.colorPrimary;
  }};
  padding: 0.7em 1.25em 0.7em 1.25em;
  height: fit-content;
  margin: ${p => p.margin};
  text-align: center;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  font-size: ${p => {
    if (p.fontSize) return p.fontSize;
    if (p.$buttonType === 'primary') return p.theme.fontSizeL;
    if (p.$buttonType === 'secondary') return p.theme.fontSizeL;
    if (p.$buttonType === 'cta') return p.theme.fontSizeXl;
  }};
  font-weight: ${p => (p.$buttonType === 'cta' ? 'bold' : 'normal')};
  border: 1px solid
    ${p => {
      if (p.disabled) return p.theme.colorLightGray;
      if (p.$buttonType === 'primary') return p.theme.colorPrimary;
      if (p.$buttonType === 'secondary') return p.theme.colorTextDark;
      if (p.$buttonType === 'cta') return p.theme.colorPrimary;
    }};
  color: ${p => {
    if (p.disabled) return p.theme.colorTextLight;
    if (p.$buttonType === 'primary') return p.theme.colorPrimary;
    if (p.$buttonType === 'secondary') return p.theme.colorTextDark;
    if (p.$buttonType === 'cta') return p.theme.colorWhite;
  }};
  transition: ${p => p.theme.transition}, box-shadow 200ms ease-out;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    background-color: ${p => {
      if (p.disabled) return p.theme.colorTextDark;
      if (p.$buttonType === 'primary') return p.theme.colorPrimary;
      if (p.$buttonType === 'secondary') return p.theme.colorGreyVeryLight;
      if (p.$buttonType === 'cta') return p.theme.colorPrimaryDark;
    }};
    border-color: ${p => {
      if (p.disabled) return p.theme.colorTextDark;
      if (p.$buttonType === 'primary') return p.theme.colorPrimary;
      if (p.$buttonType === 'secondary') return p.theme.colorTextDark;
      if (p.$buttonType === 'cta') return p.theme.colorPrimaryDark;
    }};
    transition: ${p => p.theme.transition};
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    box-shadow: 0 0 0 2px white,
      0 0 0 4px
        ${p => {
          if (p.$buttonType === 'primary') return p.theme.colorPrimary;
          if (p.$buttonType === 'cta') return p.theme.colorPrimary;
          if (p.$buttonType === 'secondary') return p.theme.colorTextDark;
        }};
  }
`;

const ButtonRound: FC<{
  type?: 'primary' | 'secondary' | 'cta';
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => Promise<void> | void;
  children: ReactNode;
  width?: string;
  fontSize?: string;
  margin?: string;
  disabled?: boolean;
}> = ({
  type = 'secondary',
  children,
  onClick = () => undefined,
  width,
  fontSize,
  margin = '0px',
  disabled = false,
}) => (
  <StyledButton
    fontSize={fontSize}
    margin={margin}
    width={width}
    onClick={onClick}
    $buttonType={type}
    disabled={disabled}
  >
    {children}
  </StyledButton>
);

export default ButtonRound;
