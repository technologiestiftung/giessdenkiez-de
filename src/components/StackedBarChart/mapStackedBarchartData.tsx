import {
  max,
  min,
  ScaleLinear,
  scaleLinear,
  ScaleTime,
  scaleTime,
  timeFormat,
} from 'd3';
import { SelectedTreeType, WateringType } from '../../common/interfaces';
import { ChartConfigType } from './getChartConfig';

interface ParsedWateringType {
  id: string;
  date: Date;
  wateringAmount: number;
}

type XScaleType = ScaleTime<number, number>;
type YScaleType = ScaleLinear<number, number>;

interface WateringsMapType {
  [key: string]: ParsedWateringType;
}

export type DayWaterAmountsType = ParsedWateringType & {
  rainingAmount: number;
};

type Get30DaysDataSignature = (args: {
  rainings: number[];
  thirtyDays: Date[];
  waterings: WateringsMapType;
}) => DayWaterAmountsType[];

type GetXAxisLabelsSignature = (args: {
  thirtyDays: Date[];
  xScale: XScaleType;
  today: Date;
}) => {
  id: string;
  x: number;
  label: string;
}[];

type GetYAxisLabelsSignature = (args: {
  yScale: YScaleType;
  chartHeight: number;
  margins: ChartConfigType['margins'];
}) => {
  id: string;
  y: number;
  label: string;
}[];

type Get30DaysExtentSignature = (args: {
  data: DayWaterAmountsType[];
  minYValue: ChartConfigType['minYValue'];
}) => [number, number];

type MapStackedBarchartDataSignature = (args: {
  selectedTree: SelectedTreeType;
  today: Date;
  config: ChartConfigType;
}) => {
  thirtyDaysData: DayWaterAmountsType[];
  xScale: XScaleType;
  xAxisLabels: ReturnType<GetXAxisLabelsSignature>;
  yScale: YScaleType;
  yAxisLabels: ReturnType<GetYAxisLabelsSignature>;
};

const yAccessor = (d: DayWaterAmountsType): number =>
  d.wateringAmount + d.rainingAmount;

const getDayString = timeFormat('%Y-%m-%d');

export const parseWaterings = (
  waterings: WateringType[] | undefined,
  [today, thirtyDaysAgo]: [Date, Date]
): WateringsMapType => {
  const isWithinBounds = (date: Date): boolean =>
    date.getTime() >= thirtyDaysAgo.getTime() &&
    date.getTime() <= today.getTime();

  return (waterings || []).reduce((acc, d) => {
    const date = new Date(d.timestamp);
    if (!isWithinBounds(date)) return acc;
    const id = getDayString(date);
    const prevItem = acc[id] || {};
    return {
      ...acc,
      [id]: {
        id,
        date,
        wateringAmount: prevItem.wateringAmount
          ? prevItem.wateringAmount + d.amount
          : d.amount,
      },
    };
  }, {});
};

const getRainingsAmount = (rainings: number[], i: number): number =>
  rainings.slice(24 * (i - 1), 24 * i).reduce((a, b) => a + b, 0);

const get30DaysExtent: Get30DaysExtentSignature = ({ data, minYValue }) => {
  const minVal = min(data, yAccessor) || 0;
  const maxVal = max(data, yAccessor) || 0;
  return [minVal, Math.max(maxVal, minYValue)];
};

const get30DaysData: Get30DaysDataSignature = ({
  thirtyDays,
  rainings,
  waterings,
}) => {
  return thirtyDays.map((d, i) => {
    const id = getDayString(d);
    const item = waterings[id] || {};
    const rainingAmount = getRainingsAmount(rainings, i);
    return {
      id,
      date: d,
      wateringAmount: item.wateringAmount || 0,
      rainingAmount,
    };
  });
};

const labelDateFormat = timeFormat('%d. %b.');
export const formatXLabel = (tick: Date, today: Date): string => {
  const todayFormatted = labelDateFormat(today);
  const tickFormatted = labelDateFormat(tick);
  if (todayFormatted === tickFormatted) return 'Heute';
  return tickFormatted;
};

const getXAxisLabels: GetXAxisLabelsSignature = ({
  thirtyDays,
  xScale,
  today,
}) =>
  [thirtyDays[5], thirtyDays[15], thirtyDays[25]].map(tick => ({
    id: getDayString(tick),
    x: Math.round(xScale(tick)),
    label: formatXLabel(tick, today),
  }));

const getYAxisLabels: GetYAxisLabelsSignature = ({
  yScale,
  margins,
  chartHeight,
}) =>
  yScale
    .ticks(5)
    .reverse()
    .map(tick => ({
      id: `${tick}`,
      y: Math.round(chartHeight - margins.bottom - yScale(tick)),
      label: `${tick}`,
    }));

export const mapStackedBarchartData: MapStackedBarchartDataSignature = ({
  selectedTree,
  today,
  config,
}) => {
  const { chartHeight, innerWidth, margins, barWidth, minYValue } = config;
  const thirtyDays = Array(30)
    .fill(null)
    .map((_, i) => new Date(today.getTime() - 24 * i * 60 * 60 * 1000));

  const xScale = scaleTime()
    .domain([thirtyDays[0], thirtyDays[thirtyDays.length - 1]])
    .range([margins.left + innerWidth - barWidth, margins.left]);
  const xAxisLabels = getXAxisLabels({ thirtyDays, xScale, today });

  const waterings = parseWaterings(
    selectedTree.waterings,
    xScale.domain() as [Date, Date]
  );

  //reverse because last element is most recent rain
  const rainings = [...selectedTree.radolan_days].reverse();

  const thirtyDaysData = get30DaysData({
    rainings,
    waterings,
    thirtyDays,
  });

  const yScale = scaleLinear()
    .domain(get30DaysExtent({ data: thirtyDaysData, minYValue }))
    .range([0, chartHeight - margins.top - margins.bottom]);

  const yAxisLabels = getYAxisLabels({ chartHeight, margins, yScale });

  return {
    thirtyDaysData,
    xScale,
    xAxisLabels,
    yScale,
    yAxisLabels,
  };
};
