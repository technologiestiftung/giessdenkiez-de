import React, { FC, MouseEvent } from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  width?: string;
  type?: string;
  margin?: string;
  fontSize?: string;
  disabled?: boolean;
}
const StyledButton = styled.div<StyledButtonProps>`
  width: ${p => (p.width !== undefined ? p.width : '-webkit-fill-available')};
  border-radius: 100px;
  background-color: ${p =>
    p.disabled
      ? p.theme.colorLightGrey
      : p.type === 'primary'
      ? '#F7FFFA'
      : '#FFFFFF'};
  padding: 12px 15px 12px 15px;
  height: fit-content;
  margin: ${p => p.margin};
  text-align: center;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  font-size: ${p => (p.fontSize ? p.fontSize : p.theme.fontSizeLl)};
  border: 1px solid
    ${p => {
      if (p.type === 'primary') {
        return p.theme.colorPrimary;
      }
      if (p.type === 'secondary') {
        return p.theme.colorTextDark;
      }
    }};
  color: ${p => {
    if (p.disabled) {
      return p.theme.colorTextLight;
    }
    if (p.type === 'primary') {
      return p.theme.colorPrimary;
    }
    if (p.type === 'secondary') {
      return p.theme.colorTextDark;
    }
  }};
  transition: ${p => p.theme.transition}, box-shadow 200ms ease-out;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    background-color: ${p =>
      p.type === 'primary' ? p.theme.colorPrimary : p.theme.colorTextDark};
    color: white;
    transition: ${p => p.theme.transition};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${p => {
        if (p.type === 'primary') {
          return p.theme.colorPrimary;
        }
        if (p.type === 'secondary') {
          return p.theme.colorTextDark;
        }
      }};
  }
`;

const ButtonRound: FC<{
  type?: string;
  onClick?: (event?: MouseEvent<HTMLDivElement>) => Promise<void> | void;
  width?: string;
  fontSize?: string;
  margin?: string;
  disabled?: boolean;
}> = ({
  type,
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
    type={type}
    disabled={disabled}
    role={'button'}
    tabIndex={0}
  >
    {children}
  </StyledButton>
);

export default ButtonRound;
