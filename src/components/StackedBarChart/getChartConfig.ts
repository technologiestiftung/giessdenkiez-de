export interface ChartConfigType {
  margins: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
  chartHeight: number;
  chartWidth: number;
  minYValue: number;
  innerWidth: number;
  innerHeight: number;
  barWidth: number;
  barPadding: number;
  tickSize: number;
}

export const getChartConfig = (): ChartConfigType => {
  const chartHeight = 140;
  const chartWidth = 310;
  const margins = {
    top: 25,
    right: 5,
    bottom: 20,
    left: 24,
  };
  const innerHeight = chartHeight - margins.top - margins.bottom;
  const innerWidth = chartWidth - margins.left - margins.right;
  return {
    chartHeight,
    chartWidth,
    margins,
    barPadding: 2,
    innerHeight,
    innerWidth,
    barWidth: Math.round(innerWidth / 30),
    minYValue: 60,
    tickSize: 6,
  };
};
