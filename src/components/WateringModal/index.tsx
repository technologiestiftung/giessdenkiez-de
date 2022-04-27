import React, { FC, useState } from 'react';
import ButtonRound from '../ButtonRound';
import { NumberInput } from '../NumberInput';
import styled from 'styled-components';
import { useWateringActions } from '../../utils/hooks/useWateringActions';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { Modal } from '../Modal';
import { DatePickerDialog } from '../DatePickerDialog';
import { subMonths, endOfDay } from 'date-fns';

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
  grid-column: 1 / 2;
  color: ${p => p.theme.colorAlarm};
  margin: 0;

  @media (min-width: ${p => p.theme.screenWidthS}) {
    grid-column: 1 / 3;
  }
`;

const SIX_MONTHS_AGO = subMonths(new Date(), 6);
const END_OF_TODAY = endOfDay(new Date());

export const WateringModal: FC<{
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}> = ({ isOpen = false, setIsOpen = () => undefined, children }) => {
  const treeId = useCurrentTreeId();
  const { waterTree, isBeingWatered } = useWateringActions(treeId);

  const [wateringValue, setWateringValue] = useState(0);
  const [wateringDate, setWateringDate] = useState(new Date());
  const [error, setError] = useState<string | undefined>(undefined);

  const handleWatering = async () => {
    if (isBeingWatered) return;
    if (wateringDate < SIX_MONTHS_AGO) {
      setError(
        'Das Gießdatum kann maximal 6 Monate in der Vergangenheit liegen.'
      );
      return;
    }
    if (wateringDate > END_OF_TODAY) {
      setError('Das Gießdatum kann nicht in der Zukunft liegen.');
      return;
    }
    if (wateringValue <= 0) {
      setError('Bitte gieße mindestens 1 Liter.');
      return;
    }
    if (!Number.isInteger(wateringValue)) {
      setError('Bitte gib eine volle Literzahl an.');
      return;
    }
    if (wateringValue >= 1000) {
      setError('Eine so große Bewässerung kann nicht eingetragen werden.');
      return;
    }

    // NOTE: We force the watering date to be in the afternoon instead of at 00:00:00 to avoid involuntary date changes:
    const wateringDateAfternoon = new Date(wateringDate.setHours(15));

    try {
      await waterTree(wateringValue, wateringDateAfternoon);
      setWateringValue(0);
      setError(undefined);
      setIsOpen(false);
    } catch (error: unknown) {
      setError((error as Error).message);
    }
  };

  return (
    <Modal title='Gießung eintragen' isOpen={isOpen} setIsOpen={setIsOpen}>
      <TwoColumnGrid>
        <NumberInput
          id='watering-value'
          label='Wie viele Liter?'
          onChange={event => {
            setWateringValue(Number(event.target.value));
          }}
        />
        <div>
          <div style={{ width: '100%' }}>
            <DatePickerDialog
              id='watering-date'
              label='Wann?'
              defaultDate={new Date()}
              onDateChange={date => setWateringDate(date)}
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
