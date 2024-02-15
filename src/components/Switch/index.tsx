import React, { FC } from 'react';
import styled from 'styled-components';

const StyledSwitch = styled.div`
  z-index: 4;
  position: fixed;
  right: 10px;
  top: 10px;
  background-color: white;
  width: 52px;
  height: 65px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.125));
`;

const StyledSwitchLeft = styled.div<{ $isActive?: boolean }>`
  padding-top: 5%;
  height: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 10px 10px 0 0;
  text-decoration: ${p => p.$isActive && 'underline'};
  font-weight: ${p => p.$isActive && 'bold'};
  &:hover {
    text-decoration: underline;
  }
`;

const StyledSwitchRight = styled.div<{ $isActive?: boolean }>`
  padding-bottom: 5%;
  height: 45%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 0 0 10px 10px;
  text-decoration: ${p => p.$isActive && 'underline'};
  font-weight: ${p => p.$isActive && 'bold'};
  &:hover {
    text-decoration: underline;
  }
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
          {firstOption.toUpperCase()}
        </StyledSwitchLeft>
        <StyledSwitchRight
          $isActive={selectedOption === secondOption}
          onClick={() => {
            onOptionSelect(secondOption);
          }}
        >
          {secondOption.toUpperCase()}
        </StyledSwitchRight>
      </StyledSwitch>
    </>
  );
};

export default Switch;
