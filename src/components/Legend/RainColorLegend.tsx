import React from 'react';
import { interpolateColor } from '../../utils/colorUtil';
import { legendLabels } from './legendLabels';
import { ItemContainer } from './ItemContainer';
import { LegendRect } from './LegendRect';
import { ItemLabel } from './ItemLabel';

export const RainColorLegend: React.FC = () => (
  <>
    {legendLabels.map(item => (
      <React.Fragment key={item.label}>
        <ItemContainer>
          <LegendRect gradient={interpolateColor(item.value)} />
          <ItemLabel>{item.label}</ItemLabel>
        </ItemContainer>
      </React.Fragment>
    ))}
  </>
);
