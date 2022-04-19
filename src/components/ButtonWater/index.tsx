import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useWateringActions } from '../../utils/hooks/useWateringActions';

import ButtonRound from '../ButtonRound';
import { NumberInput } from '../NumberInput';
import { ParticipateButton } from '../ParticipateButton';

import { buttonLabels } from './button-water-label-maker';

const BtnWaterContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  margin-top: 10px;
  width: 100%;
`;

const BtnWaterSuggestions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const CustomWateringContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 96px auto;
  align-items: flex-end;
  gap: 8px;
  margin: 10px 0;
`;

const ButtonWater: FC = () => {
  const treeId = useCurrentTreeId();
  const { isBeingWatered, waterTree } = useWateringActions(treeId);
  const [waterButtonIsOpened, setWaterButtonIsOpened] = useState<boolean>(
    false
  );
  const [customWateringValue, setCustomWateringValue] = useState(0);

  if (!treeId) return null;
  return (
    <>
      <ButtonRound
        width='-webkit-fill-available'
        onClick={() => setWaterButtonIsOpened(!waterButtonIsOpened)}
        type='primary'
      >
        {waterButtonIsOpened &&
          isBeingWatered &&
          'Bewässerung wird eingetragen'}
        {waterButtonIsOpened && !isBeingWatered && 'Wieviel Wasser?'}
        {!waterButtonIsOpened && 'Ich habe gegossen!'}
      </ButtonRound>
      {waterButtonIsOpened && (
        <BtnWaterContainer>
          <BtnWaterSuggestions>
            {buttonLabels.map(btn => {
              return (
                <ButtonRound
                  key={`${btn.amount}`}
                  width='fit-content'
                  onClick={() =>
                    waterTree(btn.amount).finally(() =>
                      setWaterButtonIsOpened(false)
                    )
                  }
                  type='primary'
                >
                  {btn.label}
                </ButtonRound>
              );
            })}
          </BtnWaterSuggestions>
          <CustomWateringContainer>
            <NumberInput
              id='custom-watering-value'
              label='Andere Literanzahl'
              onChange={event => {
                setCustomWateringValue(Number(event.target.value));
              }}
            />
            <ButtonRound
              key={`submit-custom-watering`}
              width='fit-content'
              onClick={() =>
                waterTree(customWateringValue).finally(() =>
                  setWaterButtonIsOpened(false)
                )
              }
              type='primary'
            >
              Senden
            </ButtonRound>
          </CustomWateringContainer>
        </BtnWaterContainer>
      )}
      <ParticipateButton />
    </>
  );
};

export default ButtonWater;
