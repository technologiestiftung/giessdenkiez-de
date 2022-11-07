import React, { FC, useState } from 'react';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';
import { useWateringActions } from '../../utils/hooks/useWateringActions';

import ButtonRound from '../ButtonRound';
import { WateringModal } from '../WateringModal';

const ButtonWater: FC = () => {
  const treeId = useCurrentTreeId();
  const [wateringIsInitiated, setWateringIsInitiated] = useState(false);
  const { isBeingWatered, isBeingUnwatered } = useWateringActions(treeId);

  if (!treeId) return null;
  return (
    <>
      <WateringModal
        isOpen={wateringIsInitiated}
        setIsOpen={setWateringIsInitiated}
      />
      <ButtonRound
        width='-webkit-fill-available'
        onClick={() => {
          setWateringIsInitiated(true);
        }}
        type='primary'
        disabled={isBeingUnwatered || isBeingWatered}
      >
        Ich habe gegossen!
      </ButtonRound>
    </>
  );
};

export default ButtonWater;
