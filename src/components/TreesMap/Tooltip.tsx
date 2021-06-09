import React, { FC } from 'react';
import styled from 'styled-components';
import { DataTable, TableItemsType } from '../DataTable';

const StyledTooltipWrapper = styled.div`
  position: absolute;
  z-index: 1;
  pointer-events: none;
  box-shadow ${({ theme }) => theme.boxShadow};
`;

export const Tooltip: FC<{
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
      className='tooltip'
    >
      <DataTable title={title} subtitle={subtitle} items={{ ...infos }} />
    </StyledTooltipWrapper>
  );
};
