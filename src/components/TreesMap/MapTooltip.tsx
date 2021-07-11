import React, { FC } from 'react';
import styled from 'styled-components';
import { DataTable, TableItemsType } from '../DataTable';

export const TOOLTIP_WIDTH = 260;

const StyledTooltipWrapper = styled.div`
  width: ${TOOLTIP_WIDTH}px;
  position: absolute;
  z-index: 3;
  pointer-events: none;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transform: translate(-50%, 10px);
`;

export const MapTooltip: FC<{
  x: number;
  y: number;
  title: string;
  subtitle: string;
  infos: TableItemsType;
}> = ({ x, y, title, subtitle, infos }) => {
  return (
    <StyledTooltipWrapper
      style={{
        left: x,
        top: y,
      }}
      className='map-tooltip'
    >
      <DataTable title={title} subtitle={subtitle} items={{ ...infos }} />
    </StyledTooltipWrapper>
  );
};
