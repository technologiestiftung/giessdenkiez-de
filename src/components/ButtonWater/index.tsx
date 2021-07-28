import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useWateringActions } from '../../utils/hooks/useWateringActions';

import ButtonRound from '../ButtonRound';
import { ParticipateButton } from '../ParticipateButton';

import { buttonLabels } from './button-water-label-maker';

const BtnWaterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  width: 100%;
`;

const ButtonWater: FC = () => {
  const treeId = useCurrentTreeId();
  const { isBeingWatered, waterTree } = useWateringActions(treeId);
  const [waterButtonIsOpened, setWaterButtonIsOpened] = useState<boolean>(
    false
  );

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
        </BtnWaterContainer>
      )}
      <ParticipateButton />
    </>
  );
};

export default ButtonWater;
