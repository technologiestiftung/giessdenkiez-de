import React, { FC, Fragment } from 'react';
import { interpolateColor } from '../../utils/colorUtil';
import { ItemLabel, legendLabels } from './LegendLabels';
import { LegendRect } from './LegendRectsDots';
import { FlexColumnCentered } from './LegendFlexBoxes';

export const RainColorLegend: FC = () => (
  <>
    {legendLabels.map(item => (
      <Fragment key={item.label}>
        <FlexColumnCentered>
          <LegendRect gradient={interpolateColor(item.value)} />
          <ItemLabel>{item.label}</ItemLabel>
        </FlexColumnCentered>
      </Fragment>
    ))}
  </>
);
