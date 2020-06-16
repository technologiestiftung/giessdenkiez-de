import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.div`
  padding: 8px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  letter-spacing: 0.25px;
  font-size: 13px;
  border: 1px solid ${p => p.theme.colorTextMedium};
  border-radius: ${p => p.theme.borderRadius};
  color: ${p => p.theme.colorTextDark};
  transition: ${p => p.theme.transition};
  margin-right: 10px;

  &:last-of-type() {
    margin-right: 0px;
  }

  &:hover {
    color: ${p => p.theme.colorTextMedium};
    transition: ${p => p.theme.transition};
  }

  &.active {
    color: ${p => p.theme.colorPrimary};
    border-color: ${p => p.theme.colorPrimary};
    transition: ${p => p.theme.transition};
  }
`;

const ButtonBorder = () => (
  <StyledButton role={'button'} tabIndex={0}></StyledButton>
);

export default ButtonBorder;
