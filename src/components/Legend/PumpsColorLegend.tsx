import React, { FC } from 'react';
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
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

const FlexRowDots = styled(FlexColumn)`
  flex-direction: row;
`;
export const PumpsColorLegend: FC = () => {
  const content = useLocalizedContent();
  return (
    <FlexRow>
      <FlexRowDots>
        <PumpsDot color={workingColor.hex} size={13} />
        <PumpLabel>{content.legend.pumpState.working}</PumpLabel>
      </FlexRowDots>
      <FlexRowDots>
        <PumpsDot color={brokenColor.hex} size={13} />
        <PumpLabel>{content.legend.pumpState.defect}</PumpLabel>
      </FlexRowDots>

      <FlexRowDots>
        <PumpsDot color={lockedColor.hex} size={13} />
        <PumpLabel>{content.legend.pumpState.locked}</PumpLabel>
      </FlexRowDots>
      <FlexRowDots>
        <PumpsDot color={defaultColor.hex} size={13} />
        <PumpLabel>{content.legend.pumpState.unknown}</PumpLabel>
      </FlexRowDots>
    </FlexRow>
  );
};
