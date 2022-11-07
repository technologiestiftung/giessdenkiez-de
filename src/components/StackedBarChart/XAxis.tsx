import React, { FC } from 'react';
import { ChartConfigType } from './getChartConfig';
import { mapStackedBarchartData } from './mapStackedBarchartData';

type XAxisPropsType = ReturnType<typeof mapStackedBarchartData> & {
  config: ChartConfigType;
};

export const XAxis: FC<XAxisPropsType> = ({ xAxisLabels, config }) => (
  <>
    {xAxisLabels.map(({ id, x, label }) => {
      const { barWidth, chartHeight, margins, tickSize } = config;
      return (
        <g
          key={id}
          data-testid='x-axis-group'
          transform={`translate(${Math.round(x + barWidth / 2) - 0.5},${
            chartHeight - margins.bottom
          })`}
        >
          <text
            textAnchor='middle'
            y={margins.bottom - tickSize + 2}
            fill='gray'
            style={{
              fontSize: '10px',
            }}
          >
            {label}
          </text>
          <line y1='0' y2={tickSize} stroke='gray' />
        </g>
      );
    })}
    <line
      x1={config.margins.left}
      x2={config.chartWidth - config.margins.right}
      y1={config.chartHeight - config.margins.bottom + 0.5}
      y2={config.chartHeight - config.margins.bottom + 0.5}
      stroke='darkgray'
    />
  </>
);
