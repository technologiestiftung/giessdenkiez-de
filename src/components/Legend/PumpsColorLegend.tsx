import React from 'react';
import styled from 'styled-components';
import {
  workingColor,
  defaultColor,
  brokenColor,
  lockedColor,
} from '../TreesMap/mapColorUtil';
import { FlexRow, FlexColumn } from './LegendFlexBoxes';
import { PumpLabel } from './LegendLabels';
import { PumpsDot } from './LegendRectsDots';

const FlexRowDots = styled(FlexColumn)`
  flex-direction: row;
`;
export const PumpsColorLegend: React.FC = () => {
  return (
    <FlexRow>
      <FlexRowDots>
        <PumpsDot color={workingColor.hex} size={13} />
        <PumpLabel>funktionsfähig</PumpLabel>
      </FlexRowDots>
      <FlexRowDots>
        <PumpsDot color={brokenColor.hex} size={13} />
        <PumpLabel>defekt</PumpLabel>
      </FlexRowDots>

      <FlexRowDots>
        <PumpsDot color={lockedColor.hex} size={13} />
        <PumpLabel>verriegelt</PumpLabel>
      </FlexRowDots>
      <FlexRowDots>
        <PumpsDot color={defaultColor.hex} size={13} />
        <PumpLabel>unbekannt</PumpLabel>
      </FlexRowDots>
    </FlexRow>
  );
};
