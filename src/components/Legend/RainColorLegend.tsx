import React from 'react';
import { interpolateColor } from '../../utils/colorUtil';
import { ItemLabel, legendLabels } from './LegendLabels';
import { LegendRect } from './LegendRectsDots';
import { FlexColumnCentered } from './LegendFlexBoxes';

export const RainColorLegend: React.FC = () => (
  <>
    {legendLabels.map(item => (
      <React.Fragment key={item.label}>
        <FlexColumnCentered>
          <LegendRect gradient={interpolateColor(item.value)} />
          <ItemLabel>{item.label}</ItemLabel>
        </FlexColumnCentered>
      </React.Fragment>
    ))}
  </>
);
