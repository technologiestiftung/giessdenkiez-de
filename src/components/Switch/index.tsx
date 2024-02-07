import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSwitch = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const StyledSwitchLeft = styled.div<{ $isActive?: boolean }>`
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  padding: 6px;
  cursor: pointer;
  &:hover {
    background-color: ${p => p.theme.colorPrimaryDark};
    color: white;
  }
  background-color: ${p => p.$isActive && p.theme.colorPrimary};
`;

const StyledSwitchRight = styled.div<{ $isActive?: boolean }>`
  border-right: 1px solid black;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: 6px;
  cursor: pointer;
  &:hover {
    background-color: ${p => p.theme.colorPrimaryDark};
    color: white;
  }
  background-color: ${p => p.$isActive && p.theme.colorPrimary};
`;

interface SwitchProps {
  firstOption: string;
  secondOption: string;
  selectedOption: string;
  onOptionSelect: (option: string) => void;
}

const Switch: FC<SwitchProps> = ({
  firstOption,
  secondOption,
  selectedOption,
  onOptionSelect,
}) => {
  return (
    <>
      <StyledSwitch>
        <StyledSwitchLeft
          $isActive={selectedOption === firstOption}
          onClick={() => {
            onOptionSelect(firstOption);
          }}
        >
          {firstOption}
        </StyledSwitchLeft>
        <StyledSwitchRight
          $isActive={selectedOption === secondOption}
          onClick={() => {
            onOptionSelect(secondOption);
          }}
        >
          {secondOption}
        </StyledSwitchRight>
      </StyledSwitch>
    </>
  );
};

export default Switch;
