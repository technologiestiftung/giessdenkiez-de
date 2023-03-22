import React, { FC } from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  width?: string;
  type?: string;
  margin?: string;
  fontSize?: string;
  disabled?: boolean;
}
const StyledButton = styled.button<StyledButtonProps>`
  width: ${p => (p.width !== undefined ? p.width : '-webkit-fill-available')};
  border-radius: 100px;
  background-color: ${p => (p.disabled ? p.theme.colorLightGrey : '#FFFFFF')};
  padding: 12px 15px 12px 15px;
  height: fit-content;
  margin: ${p => p.margin};
  text-align: center;
  cursor: ${p => (p.disabled ? 'default' : 'pointer')};
  font-size: ${p => (p.fontSize ? p.fontSize : p.theme.fontSizeLl)};
  border: 1px solid ${p => p.theme.colorTextDark};
  color: ${p => {
    if (p.disabled) {
      return p.theme.colorTextLight;
    }
    // if (p.type === 'submit') {
    //   return p.theme.colorPrimary;
    // }
  }};
  transition: ${p => p.theme.transition}, box-shadow 200ms ease-out;
  box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    background-color: ${p => p.theme.colorTextDark};
    color: white;
    transition: ${p => p.theme.transition};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px
      ${p => {
        if (p.type === 'submit') {
          return p.theme.colorPrimary;
        }
      }};
  }
`;

const ButtonSubmitRound: FC<{
  type?: 'button' | 'submit' | 'reset';
  width?: string;
  fontSize?: string;
  margin?: string;
  disabled?: boolean;
}> = ({
  type,
  children,
  width,
  fontSize,
  margin = '0px',
  disabled = false,
}) => (
  <StyledButton
    fontSize={fontSize}
    margin={margin}
    width={width}
    type={type}
    disabled={disabled}
    role={'button'}
    tabIndex={0}
  >
    {children}
  </StyledButton>
);

export default ButtonSubmitRound;
