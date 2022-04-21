import React, { FC, useState } from 'react';
import ButtonRound from '../ButtonRound';
import { NumberInput } from '../NumberInput';
import styled from 'styled-components';
import { useWateringActions } from '../../utils/hooks/useWateringActions';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { Modal } from '../Modal';

const TwoColumnGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  @media (min-width: ${p => p.theme.screenWidthS}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const ButtonsContainer = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
`;

const StyledError = styled.p`
  grid-column: 1 / 3;
  color: ${p => p.theme.colorAlarm};
  margin: 0;
`;

export const WateringModal: FC<{
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}> = ({ isOpen = false, setIsOpen = () => undefined, children }) => {
  const treeId = useCurrentTreeId();
  const { waterTree, isBeingWatered } = useWateringActions(treeId);

  const [wateringValue, setWateringValue] = useState(0);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleWatering = () => {
    if (isBeingWatered) return;
    if (wateringValue === 0) {
      setError('Bitte gib an, wie viele Liter Du gegossen hast.');
      return;
    }
    if (wateringValue >= 1000) {
      setError('Eine so große Bewässerung kann nicht eingetragen werden.');
      return;
    }
    void waterTree(wateringValue).finally(() => {
      setWateringValue(0);
      setError(undefined);
      setIsOpen(false);
    });
  };

  return (
    <Modal title='Gießung eintragen' isOpen={isOpen} setIsOpen={setIsOpen}>
      <TwoColumnGrid>
        <div>
          <NumberInput
            id='watering-value'
            label='Wie viele Liter?'
            max={999}
            onChange={event => {
              setWateringValue(Number(event.target.value));
              console.log(wateringValue);
            }}
          />
        </div>

        <div>
          <div style={{ width: '100%' }}>
            {/* TODO: replace this with proper component */}
            <label htmlFor='watering-date'>Wann?</label>
            <br></br>
            <input
              type='date'
              name='watering-date'
              value='2022-04-20'
              id='watering-date'
              style={{
                marginTop: '8px',
                padding: '10px',
                color: '#37DE8A',
              }}
            />
          </div>
        </div>
        {error && <StyledError>{error}</StyledError>}
        {children}
      </TwoColumnGrid>
      <ButtonsContainer>
        <ButtonRound
          key={`cancel-watering`}
          width='fit-content'
          onClick={() => {
            setWateringValue(0);
            setError(undefined);
            setIsOpen(false);
          }}
        >
          Abbrechen
        </ButtonRound>
        <ButtonRound
          key={`save-watering`}
          width='fit-content'
          type='primary'
          onClick={handleWatering}
        >
          {isBeingWatered ? 'Wird eingetragen ...' : 'Speichern'}
        </ButtonRound>
      </ButtonsContainer>
    </Modal>
  );
};
