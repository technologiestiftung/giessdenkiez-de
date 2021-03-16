import React, { FC } from 'react';
import styled from 'styled-components';

interface StyledButtonProps {
  width?: string;
  type?: string;
  margin?: string;
  fontSize?: string;
}
const StyledButton = styled.div<StyledButtonProps>`
  width: ${p => (p.width !== undefined ? p.width : '-webkit-fill-available')};
  border-radius: 100px;
  background-color: ${p => (p.type === 'primary' ? '#F7FFFA' : '#FFFFFF')};
  padding: 12px 15px 12px 15px;
  height: fit-content;
  margin-bottom: ${p => p.margin};
  text-align: center;
  cursor: pointer;
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
    if (p.type === 'primary') {
      return p.theme.colorPrimary;
    }
    if (p.type === 'secondary') {
      return p.theme.colorTextDark;
    }
  }};
  transition: ${p => p.theme.transition};

  &:hover {
    background-color: ${p =>
      p.type === 'primary' ? p.theme.colorPrimary : p.theme.colorTextDark};
    color: white;
    transition: ${p => p.theme.transition};
  }
`;

const ButtonRound: FC<{
  type?: string;
  toggle: (event?: React.MouseEvent<HTMLDivElement>) => Promise<void> | void;
  width?: string;
  fontSize?: string;
  margin?: string;
}> = ({ type, children, toggle, width, fontSize, margin = '0px' }) => (
  <StyledButton
    fontSize={fontSize}
    margin={margin}
    width={width}
    onClick={toggle}
    type={type}
    role={'button'}
    tabIndex={0}
  >
    {children}
  </StyledButton>
);

export default ButtonRound;
