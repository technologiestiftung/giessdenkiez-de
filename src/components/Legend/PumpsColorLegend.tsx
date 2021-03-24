import React from 'react';
import {
  workingColor,
  defaultColor,
  brokenColor,
  lockedColor,
} from '../map/colors';
import { PumpsDot } from './PumpsDot';
import { PumpLabel } from './PumpLabel';
import { UnstyledFlex } from './UnstyledFlex';
import { FlexRow } from './FlexRow';

export const PumpsColorLegend: React.FC = () => {
  return (
    <UnstyledFlex>
      <FlexRow>
        <PumpsDot color={workingColor.hex} size={13} />
        <PumpLabel>{'funktionsfähig'}</PumpLabel>
      </FlexRow>
      <FlexRow>
        <PumpsDot color={brokenColor.hex} size={13} />
        <PumpLabel>{'defekt'}</PumpLabel>
      </FlexRow>

      <FlexRow>
        <PumpsDot color={lockedColor.hex} size={13} />
        <PumpLabel>{'verriegelt'}</PumpLabel>
      </FlexRow>
      <FlexRow>
        <PumpsDot color={defaultColor.hex} size={13} />
        <PumpLabel>{'unbekannt'}</PumpLabel>
      </FlexRow>
    </UnstyledFlex>
  );
};
