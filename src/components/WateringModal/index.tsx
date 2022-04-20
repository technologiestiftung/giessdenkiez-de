import React, { FC, useState } from 'react';
import ButtonRound from '../ButtonRound';
import { NumberInput } from '../NumberInput';
import { Dialog } from '@headlessui/react';
import styled from 'styled-components';
import { useWateringActions } from '../../utils/hooks/useWateringActions';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';

const TwoColumnGrid = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  gap: 8px;

  @media (min-width: ${p => p.theme.screenWidthS}) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StyledOverlay = styled(Dialog.Overlay)`
  background-color: rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 100%;
  height: 100%;
`;

const StyledTitle = styled(Dialog.Title)`
  margin-top: 0;
  color: ${p => p.theme.colorPrimary};
`;

const ButtonsContainer = styled.div`
  margin-top: 48px;
  display: flex;
  justify-content: space-between;
`;

const DialogContent = styled.div`
  display: block;
  background-color: white;
  padding: 24px;
  z-index: 10;
`;

const DialogWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 99999999,
      }}
    >
      <DialogWrapper>
        <StyledOverlay />
        <DialogContent>
          <StyledTitle>Gießung eintragen</StyledTitle>
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
        </DialogContent>
      </DialogWrapper>
    </Dialog>
  );
};
