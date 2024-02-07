import React, { FC } from 'react';
import styled from 'styled-components';
import useClickOutside from '../../utils/hooks/useClickOutside';
import { DataTable, TableItemsType } from '../DataTable';

export const TOOLTIP_WIDTH = 260;

const StyledTooltipWrapper = styled.div`
  width: ${TOOLTIP_WIDTH}px;
  position: absolute;
  z-index: 3;
  box-shadow: ${({ theme }) => theme.boxShadow};
  transform: translate(-50%, 10px);
  padding: 20px;
  background-color: white;
`;

export const MapTooltip: FC<{
  x: number;
  y: number;
  title: string;
  subtitle: string;
  infos: TableItemsType;
  onClickOutside?: () => void;
}> = ({ x, y, title, subtitle, infos, onClickOutside = () => undefined }) => {
  const ref = useClickOutside<HTMLDivElement>(onClickOutside);
  return (
    <StyledTooltipWrapper
      ref={ref}
      style={{
        left: x,
        top: y,
      }}
      className='map-tooltip'
    >
      <DataTable title={title} subtitle={subtitle} items={infos} />
    </StyledTooltipWrapper>
  );
};
