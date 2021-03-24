import React from 'react';
import { interpolateColor } from '../../utils/colorUtil';
import { legendLabels } from './legendLabels';
import { LegendDot } from './Legend';
import { ItemContainer } from './ItemContainer';
import { ItemLabel } from './ItemLabel';

export const TreesColorLegend: React.FC = () => (
  <>
    {legendLabels.map(item => {
      return (
        <React.Fragment key={item.label}>
          <ItemContainer>
            <LegendDot color={interpolateColor(item.value)} />
            <ItemLabel>{item.label}</ItemLabel>
          </ItemContainer>
        </React.Fragment>
      );
    })}
  </>
);
