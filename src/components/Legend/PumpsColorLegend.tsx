import React from 'react';
import {
  workingColor,
  defaultColor,
  brokenColor,
  lockedColor,
} from '../map/colors';
import { FlexRow, FlexColumnLast } from './LegendFlexBoxes';
import { PumpLabel } from './LegendLabels';
import { PumpsDot } from './LegendRectsDots';
export const PumpsColorLegend: React.FC = () => {
  return (
    <FlexRow>
      <FlexColumnLast>
        <PumpsDot color={workingColor.hex} size={13} />
        <PumpLabel>funktionsfähig</PumpLabel>
      </FlexColumnLast>
      <FlexColumnLast>
        <PumpsDot color={brokenColor.hex} size={13} />
        <PumpLabel>defekt</PumpLabel>
      </FlexColumnLast>

      <FlexColumnLast>
        <PumpsDot color={lockedColor.hex} size={13} />
        <PumpLabel>verriegelt</PumpLabel>
      </FlexColumnLast>
      <FlexColumnLast>
        <PumpsDot color={defaultColor.hex} size={13} />
        <PumpLabel>unbekannt</PumpLabel>
      </FlexColumnLast>
    </FlexRow>
  );
};
