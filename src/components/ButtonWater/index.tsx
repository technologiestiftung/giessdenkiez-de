import React, { FC, useState } from 'react';
import styled from 'styled-components';

import ButtonRound from '../ButtonRound';
import { ParticipateButton } from '../ParticipateButton';

import { buttonLabels } from './button-water-label-maker';

const BtnWaterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

export interface ButtonWaterProps {
  onClick: (amount: number) => void;
}

const ButtonWater: FC<ButtonWaterProps> = ({ onClick }) => {
  const [waterButtonIsOpened, setWaterButtonIsOpened] = useState<boolean>(
    false
  );
  return (
    <>
      <ButtonRound
        width='-webkit-fill-available'
        onClick={() => setWaterButtonIsOpened(!waterButtonIsOpened)}
        type='primary'
      >
        {waterButtonIsOpened ? 'Wieviel Wasser?' : 'Ich habe gegossen!'}
      </ButtonRound>
      {waterButtonIsOpened && (
        <BtnWaterContainer>
          {buttonLabels.map(btn => {
            return (
              <ButtonRound
                key={`${btn.amount}`}
                width='fit-content'
                onClick={() => onClick(btn.amount)}
                type='primary'
              >
                {btn.label}
              </ButtonRound>
            );
          })}
        </BtnWaterContainer>
      )}
      <ParticipateButton />
    </>
  );
};

export default ButtonWater;
