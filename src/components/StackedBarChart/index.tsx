import React, { FC, useEffect, useState, useMemo } from 'react';
import styled from 'styled-components';
import {
  DailyWaterAmountsType,
  SelectedTreeType,
} from '../../common/interfaces';
import { drawD3Chart } from './drawD3Chart';
import { mapStackedBarchartData } from './mapStackedBarchartData';

const BarChartWrapper = styled.div`
  width: 100%;
  height: 140px;
  margin: 0 0 5px 0;
  position: relative;
`;

const StyledLegendWrapper = styled.div`
  display: flex;
  padding-bottom: 1em;
  > div {
    display: flex;
    font-size: 10px;
    padding-right: 1em;
  }
`;

const StyledLegendCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

const StyledTooltip = styled.div`
  position: absolute;
  top: 14px;
  right: 0;
  min-width: 50%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-60%);
  font-size: 13px;
  opacity: 0;
  transition: opacity 200ms ease-out 1s;

  &.hovered {
    opacity: 1;
    transition: opacity 200ms ease-out 0s;
  }
`;

const StyledTooltipValue = styled.span`
  display: inline-grid;
  grid-template-columns: 16px auto;
`;

const StyledTooltipTotalSymbol = styled.span`
  display: inline-block;
  line-height: 9px;
  vertical-align: middle;
  font-size: 12px;
  transform: translateX(1px);
  font-weight: bold;
`;

const StackedBarChart: FC<{
  selectedTreeData: SelectedTreeType;
  date?: Date;
}> = ({ selectedTreeData, date }) => {
  const today = useMemo(() => date || new Date(), [date]);

  const [waterAmountInLast30Days, setWaterAmountInLast30Days] = useState<
    DailyWaterAmountsType[] | null
  >(null);

  useEffect(() => {
    if (!selectedTreeData) return;
    setWaterAmountInLast30Days(mapStackedBarchartData(selectedTreeData, today));
  }, [selectedTreeData, today]);

  useEffect(() => {
    if (waterAmountInLast30Days === null) return;

    drawD3Chart(waterAmountInLast30Days, today);
  }, [waterAmountInLast30Days, today]);

  const wateredCircle = (
    <StyledLegendCircle style={{ backgroundColor: '#8B77F7' }} />
  );
  const rainCircle = (
    <StyledLegendCircle style={{ backgroundColor: '#75ADE8' }} />
  );
  return (
    <>
      <BarChartWrapper id='barchart'>
        <StyledTooltip id='barchart-tooltip'>
          <StyledTooltipValue>
            <strong>{wateredCircle}</strong>
            <span id='barchart-tooltip-val-watered' />
          </StyledTooltipValue>
          <StyledTooltipValue>
            <strong>{rainCircle}</strong>
            <span id='barchart-tooltip-val-rain' />
          </StyledTooltipValue>
          <StyledTooltipValue>
            <StyledTooltipTotalSymbol>∑</StyledTooltipTotalSymbol>
            <span id='barchart-tooltip-val-total' />
          </StyledTooltipValue>
        </StyledTooltip>
      </BarChartWrapper>
      <StyledLegendWrapper>
        <div>
          {wateredCircle}
          <div>&nbsp;Gießungen</div>
        </div>
        <div>
          {rainCircle}
          <div>&nbsp;Regen</div>
        </div>
      </StyledLegendWrapper>
    </>
  );
};

export default StackedBarChart;
