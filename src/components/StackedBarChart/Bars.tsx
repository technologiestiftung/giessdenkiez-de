import React, { FC } from 'react';
import styled from 'styled-components';
import { ChartConfigType } from './getChartConfig';
import {
  DayWaterAmountsType,
  mapStackedBarchartData,
} from './mapStackedBarchartData';

type BarsPropsType = ReturnType<typeof mapStackedBarchartData> & {
  config: ChartConfigType;
  onBarHover?: (d: DayWaterAmountsType | null) => void;
};

const BarHoverTrigger = styled.rect`
  fill: rgba(0, 0, 0, 0);
  cursor: pointer;
  transition: fill 200ms ease-out;

  &:hover {
    fill: rgba(0, 0, 0, 0.1);
  }
`;

export const Bars: FC<BarsPropsType> = ({
  thirtyDaysData,
  xScale,
  yScale,
  config,
  onBarHover = () => undefined,
}) => (
  <>
    {thirtyDaysData.map(dayData => {
      const { id, date, wateringAmount, rainingAmount } = dayData;
      const { margins, barPadding, innerHeight, barWidth } = config;
      const x = Math.round(xScale(date));
      const y = margins.top;
      let rainingHeight = Math.round(yScale(rainingAmount));
      rainingHeight = rainingHeight > 0 ? Math.max(2, rainingHeight) : 0;
      let wateringHeight = Math.round(yScale(wateringAmount));
      wateringHeight = wateringHeight > 0 ? Math.max(2, wateringHeight) : 0;
      const rainingY = Math.round(innerHeight - rainingHeight);
      const wateringY = Math.round(
        innerHeight - wateringHeight - rainingHeight
      );
      return (
        <g key={id} transform={`translate(${x},${y})`} data-testid='bar-group'>
          <rect
            y={rainingY}
            fill='#75ADE8'
            width={barWidth - barPadding}
            height={rainingHeight}
          />
          <rect
            y={wateringY}
            fill='#8B77F7'
            width={barWidth - barPadding}
            height={wateringHeight}
          />
          <BarHoverTrigger
            width={barWidth - barPadding}
            height={innerHeight}
            onMouseOver={() => onBarHover(dayData)}
          />
        </g>
      );
    })}
  </>
);
