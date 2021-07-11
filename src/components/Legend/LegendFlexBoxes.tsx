import styled from 'styled-components';
import { IsActiveProps } from './MapLayersLegend';
export interface FlexColumnProps {
  isLast?: boolean;
}
export const FlexColumnLast = styled.div<FlexColumnProps>`
  display: flex;
  flex-direction: column;
  ${props => (props.isLast === true ? 'margin-top:auto;' : '')}
`;
export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  border-bottom: none;
  justify-content: flex-start;
  margin-bottom: 0;
`;
export const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  height: 16px;
  line-height: 16px;
  padding: 4px 9px;
  width: 100%;
  align-items: center;
  margin-right: 10px;
`;

export const FlexColumnCentered = styled.div<IsActiveProps>`
  display: flex;
  flex-direction: column;
  height: 40px;
  align-items: ${p => (p.isActive ? 'baseline' : 'center')};
  justify-content: center;
  margin-right: 10px;
`;

export const FlexRowFit = styled(FlexRow)<IsActiveProps>`
  border-bottom: none;
  width: fit-content;
  margin-right: 10px;
  margin-bottom: 0;
  padding: 6px 9px;
  margin-bottom: 2px;
  cursor: pointer;
  border-radius: 100px;
  background: ${p => (p.isActive ? p.theme.colorTextMedium : 'white')};
  transition: all 0.125s ease-in-out;

  &:hover {
    background: ${p =>
      p.isActive ? p.theme.colorGreyLight : p.theme.colorTextMedium};
    transition: all 0.125s ease-in-out;
  }
`;

export const FlexSpace = styled.div<IsActiveProps>`
  display: flex;
  flex-direction: row;
  align-items: ${p => (p.isActive ? 'baseline' : 'center')};
  justify-content: space-between;
`;
