import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DailyWaterAmountsType } from '../../common/interfaces';
import { useStoreState } from '../../state/unistore-hooks';
import { drawD3Chart } from './drawD3Chart';
import { mapStackedBarchartData } from './mapStackedBarchartData';

const BarChartWrapper = styled.div`
  width: 100%;
  height: 140px;
  margin: 5px 0;
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
  min-width: 50px;
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  grid-template-columns: 1em auto;
  grid-column-gap: 4px;
  grid-row-gap: 2px;
  transform: translateY(-60%);
  font-size: 13px;
  opacity: 0;
  transition: opacity 200ms ease-out 1s;

  &.hovered {
    opacity: 1;
    transition: opacity 200ms ease-out 0s;
  }
`;

const StyledTooltipTotalSymbol = styled.span`
  display: inline-block;
  line-height: 9px;
  vertical-align: middle;
  font-size: 12px;
  transform: translateX(1px);
  font-weight: bold;
`;

const StackedBarChart: FC = () => {
  const { selectedTreeData } = useStoreState('selectedTreeData');

  const [waterAmountInLast30Days, setWaterAmountInLast30Days] = useState<
    DailyWaterAmountsType[] | null
  >(null);

  useEffect(() => {
    if (!selectedTreeData) return;

    setWaterAmountInLast30Days(
      mapStackedBarchartData({
        selectedTree: selectedTreeData,
        treeLastWatered: selectedTreeData.wateredDays || [],
      })
    );
  }, [selectedTreeData]);

  useEffect(() => {
    if (waterAmountInLast30Days === null) return;

    drawD3Chart(waterAmountInLast30Days);
  }, [waterAmountInLast30Days]);

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
          <strong>{wateredCircle}</strong>
          <span id='barchart-tooltip-val-watered' />
          <strong>{rainCircle}</strong>
          <span id='barchart-tooltip-val-rain' />
          <StyledTooltipTotalSymbol>∑</StyledTooltipTotalSymbol>
          <span id='barchart-tooltip-val-total' />
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
