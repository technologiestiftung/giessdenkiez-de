import { FC, Fragment } from 'react';
import { interpolateColor } from '../../utils/colorUtil';
import { legendLabels, ItemLabel } from './LegendLabels';
import { FlexColumnCentered } from './LegendFlexBoxes';
import { LegendDot } from './LegendRectsDots';

export const TreesColorLegend: FC = () => (
  <>
    {legendLabels.map(item => {
      return (
        <Fragment key={item.label}>
          <FlexColumnCentered>
            <LegendDot color={interpolateColor(item.value)} />
            <ItemLabel>{item.label}</ItemLabel>
          </FlexColumnCentered>
        </Fragment>
      );
    })}
  </>
);
