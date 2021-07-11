import styled from 'styled-components';
interface PumpsDotProps {
  color: string;
  size: number;
}
interface LegendDotProps {
  color: string;
  gradient?: string;
}

export const StrokedLegendDot = styled.div<Pick<LegendDotProps, 'gradient'>>`
  border-radius: 100px;
  margin-right: 5px;
  ${p => (p.gradient ? `background: ${p.gradient}` : 'background-color: none')};
  width: 10px;
  height: 10px;
  border: 2px solid ${p => p.theme.colorTextDark};
`;
export const LegendDot = styled.div<LegendDotProps>`
  width: 13px;
  height: 13px;
  border-radius: 100px;
  margin-right: 5px;
  ${p =>
    p.gradient ? `background: ${p.gradient}` : `background-color: ${p.color}`};
`;
export const LegendRect = styled.div<Pick<LegendDotProps, 'gradient'>>`
  width: 9px;
  height: 9px;
  margin-right: 5px;
  border: 2px solid ${p => p.theme.colorTextDark};
  ${p => (p.gradient ? `background: ${p.gradient}` : 'background-color: none')};
`;

export const PumpsDot = styled.div<PumpsDotProps>`
  width: ${p => p.size - 2}px;
  height: ${p => p.size - 3}px;
  border-radius: ${p => p.size / 2}px;
  margin-right: 6px;
  background-color: ${p => p.color};
  border: 2px solid ${p => p.theme.colorTextDark};
`;
