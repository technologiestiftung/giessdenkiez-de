import React, { FC } from 'react';
import { ChartConfigType } from './getChartConfig';
import { mapStackedBarchartData } from './mapStackedBarchartData';

type YAxisPropsType = ReturnType<typeof mapStackedBarchartData> & {
  config: ChartConfigType;
};

export const YAxis: FC<YAxisPropsType> = ({ yAxisLabels, config }) => (
  <>
    {yAxisLabels.map(({ id, y, label }) => {
      const { margins, tickSize, chartWidth } = config;
      return (
        <g
          key={id}
          transform={`translate(0,${Math.round(y)}.5)`}
          data-testid='y-axis-group'
        >
          <text
            textAnchor='end'
            x={margins.left - tickSize + 2}
            y='.2rem'
            fill='gray'
            style={{
              fontSize: '10px',
            }}
          >
            {label}
          </text>
          <line
            x1={margins.left}
            x2={chartWidth - margins.right}
            stroke='#E6E6E6'
          />
        </g>
      );
    })}
  </>
);
