import React, { FC, useState } from 'react';
import { useCurrentTreeId } from '../../utils/hooks/useCurrentTreeId';

import ButtonRound from '../ButtonRound';
import { ParticipateButton } from '../ParticipateButton';
import { WateringModal } from '../WateringModal';

const ButtonWater: FC = () => {
  const treeId = useCurrentTreeId();
  const [wateringIsInitiated, setWateringIsInitiated] = useState(false);

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
      >
        Ich habe gegossen!
      </ButtonRound>
      <ParticipateButton />
    </>
  );
};

export default ButtonWater;
