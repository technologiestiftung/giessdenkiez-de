import React, { FC } from 'react';
import styled from 'styled-components';
import { DayWaterAmountsType, formatXLabel } from './mapStackedBarchartData';
import useLocalizedContent from '../../utils/hooks/useLocalizedContent';

interface TooltipPropsType {
  hoveredBar: DayWaterAmountsType | null;
  today: Date;
}

const StyledLegendCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
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

export const wateredCircle = (
  <StyledLegendCircle style={{ backgroundColor: '#8B77F7' }} />
);
export const rainCircle = (
  <StyledLegendCircle style={{ backgroundColor: '#75ADE8' }} />
);

export const StyledWrapper = styled.div`
  position: absolute;
  top: 14px;
  right: 0;
  min-width: 70%;
  display: flex;
  justify-content: space-between;
  transform: translateY(-60%);
  font-size: 13px;
  opacity: 0;
  transition: opacity 200ms ease-out 1s;
`;

const StyledValue = styled.span`
  display: inline-grid;
  grid-template-columns: 16px auto;
  white-space: nowrap;
`;

const TotalSymbol = styled.span`
  display: inline-block;
  line-height: 9px;
  vertical-align: middle;
  font-size: 12px;
  transform: translateX(1px);
  font-weight: bold;
`;

const StyledYAxisLabelText = styled.text`
  font-size: 10px;
`;

const formatTooltipValue: (val: number) => string = val => `${val.toFixed(1)}l`;

export const Tooltip: FC<TooltipPropsType> = ({ hoveredBar, today }) => (
  <StyledWrapper>
    <b>{hoveredBar && formatXLabel(hoveredBar.date, today)}</b>
    <StyledValue>
      <strong>{wateredCircle}</strong>
      <span>{formatTooltipValue(hoveredBar?.wateringAmount || 0)}</span>
    </StyledValue>
    <StyledValue>
      <strong>{rainCircle}</strong>
      <span>{formatTooltipValue(hoveredBar?.rainingAmount || 0)}</span>
    </StyledValue>
    <StyledValue>
      <TotalSymbol>∑</TotalSymbol>
      <span>
        {formatTooltipValue(
          (hoveredBar?.wateringAmount || 0) + (hoveredBar?.rainingAmount || 0)
        )}
      </span>
    </StyledValue>
  </StyledWrapper>
);

export const YAxisLegend: FC = () => {
  const content = useLocalizedContent();
  const { litersPerSqm } = content.sidebar.tree;
  return (
    <g transform='translate(0,12)'>
      <StyledYAxisLabelText>↑ {litersPerSqm}</StyledYAxisLabelText>
    </g>
  );
};

export const ColorLegend: FC = () => {
  const content = useLocalizedContent();
  const { rain, waterings } = content.sidebar.tree;
  return (
    <StyledLegendWrapper>
      <div>
        {wateredCircle}
        <div>&nbsp;{waterings}</div>
      </div>
      <div>
        {rainCircle}
        <div>&nbsp;{rain}</div>
      </div>
    </StyledLegendWrapper>
  );
};
