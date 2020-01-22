import {react} from 'react';
import styled from 'styled-components';

const ButtonBorder = styled.div`
  padding: 8px 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  letter-spacing: .25px;
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

export default ButtonBorder;