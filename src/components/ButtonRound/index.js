import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  width: ${ p => p.width != undefined ? p.width : 'fit-content' };
  border-radius: 100px;
  background-color: ${p => p.type === 'primary' ? '#F7FFFA': '#FFFFFF'};
  padding: 12px 15px 12px 15px;
  text-align: center;
  cursor: pointer;
  font-size: ${p => p.theme.fontSizeL};
  border: 1px solid ${p => {
    if (p.type == 'primary') {
      return p.theme.colorPrimary;
    }
    if (p.type == 'secondary') {
      return p.theme.colorTextDark;
    }
  }};
  color: ${p => {
    if (p.type == 'primary') {
      return p.theme.colorPrimary;
    }
    if (p.type == 'secondary') {
      return p.theme.colorTextDark;
    }
  }};
  transition: ${p => p.theme.transition};

  &:hover {
    background-color: ${p => (p.type === 'primary') ? p.theme.colorPrimary : p.theme.colorTextDark};
    color: white;
    transition: ${p => p.theme.transition};
  }
`;

const ButtonRound = p => {
  const { type, children, toggle, width } = p;
  return (
    <StyledButton width={width} onClick={toggle} type={type}>
      { children }
    </StyledButton>
  );
}

export default ButtonRound;