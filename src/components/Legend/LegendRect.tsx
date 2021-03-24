import styled from 'styled-components';
import { LegendDotProps } from '../../common/interfaces';

export const LegendRect = styled.div<Pick<LegendDotProps, 'gradient'>>`
  width: 9px;
  height: 9px;
  margin-right: 5px;
  border: 2px solid ${p => p.theme.colorTextDark};
  ${p => (p.gradient ? `background: ${p.gradient}` : 'background-color: none')};
`;
