import React, { FC, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import { SelectedTreeType } from '../../common/interfaces';
import { Bars } from './Bars';
import { getChartConfig } from './getChartConfig';
import {
  DayWaterAmountsType,
  mapStackedBarchartData,
} from './mapStackedBarchartData';
import {
  Tooltip,
  ColorLegend,
  StyledWrapper as TooltipWrapper,
  YAxisLegend,
} from './TooltipLegend';
import { XAxis } from './XAxis';
import { YAxis } from './YAxis';

const BarChartWrapper = styled.div`
  width: 100%;
  height: 140px;
  margin: 0 0 12px 0;
  position: relative;

  &:hover ${TooltipWrapper} {
    opacity: 1;
    transition: opacity 200ms ease-out 0s;
  }
`;

const config = getChartConfig();

const StackedBarChart: FC<{
  selectedTreeData: SelectedTreeType;
  date?: Date;
}> = ({ selectedTreeData, date }) => {
  const today = useMemo(() => new Date(date || new Date()), [date]);

  const [chartData, setChartData] = useState<ReturnType<
    typeof mapStackedBarchartData
  > | null>(null);

  const [hoveredBar, setHoveredBar] = useState<DayWaterAmountsType | null>(
    null
  );

  useEffect(() => {
    if (!selectedTreeData) return;
    setChartData(
      mapStackedBarchartData({
        selectedTree: selectedTreeData,
        today,
        config,
      })
    );
  }, [selectedTreeData, today]);

  return (
    <>
      <BarChartWrapper>
        <Tooltip hoveredBar={hoveredBar} today={today} />
        {chartData && (
          <svg width={config.chartWidth} height={config.chartHeight}>
            <YAxis {...chartData} config={config} />
            <Bars {...chartData} config={config} onBarHover={setHoveredBar} />
            <XAxis {...chartData} config={config} />
            <YAxisLegend />
          </svg>
        )}
      </BarChartWrapper>
      <ColorLegend />
    </>
  );
};

export default StackedBarChart;
