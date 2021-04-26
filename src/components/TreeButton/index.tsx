import React, { FC } from 'react';
import styled from 'styled-components';
import NatureIcon from '@material-ui/icons/Nature';

const StyledTreeButton = styled.div`
  font-size: 12px;
  border: 1px solid ${p => p.theme.colorTextDark};
  border-radius: 100px;
  display: inline-flex;
  padding: 5px 7px 5px 7px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  transition: 0.125s opacity ease-in-out, box-shadow 200ms ease-out;
  margin-bottom: 10px;
  cursor: pointer;
  gap: 8px;

  &:hover {
    transition: 0.125s opacity ease-in-out;
    background: ${p => p.theme.colorTextDark};
    color: white;

    svg {
      transition: 0.125s opacity ease-in-out;
      fill: white;
    }
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px;
  }

  svg {
    width: 0.75em;
    height: 0.75em;
    transition: 0.125s opacity ease-in-out;
  }
`;

const Label = styled.span``;

const TreeButton: FC<{
  label?: string;
  onClickHandler: () => void;
}> = ({ label, onClickHandler }) => {
  return (
    <StyledTreeButton role={'button'} tabIndex={0} onClick={onClickHandler}>
      <Label>{label ? label : 'Baum'}</Label>
      <NatureIcon />
    </StyledTreeButton>
  );
};

export default TreeButton;
