import styled from 'styled-components';
import { PumpsDotProps } from '../../common/interfaces';

export const PumpsDot = styled.div<PumpsDotProps>`
  width: ${p => p.size - 2}px;
  height: ${p => p.size - 3}px;
  border-radius: ${p => p.size / 2}px;
  margin-right: 6px;
  background-color: ${p => p.color};
  border: 2px solid ${p => p.theme.colorTextDark};
`;
