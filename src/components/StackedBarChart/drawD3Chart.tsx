import {
  select,
  selectAll,
  scaleTime,
  scaleLinear,
  scaleOrdinal,
  axisLeft,
  axisBottom,
  stack,
  ScaleLinear,
  Selection,
  ContainerElement,
  SeriesPoint,
} from 'd3';
import { DailyWaterAmountsType } from '../../common/interfaces';

type mouseFunctionSignature = (
  this: ContainerElement,
  _evt: MouseEvent,
  d: SeriesPoint<DailyWaterAmountsType>
) => void;

type getMouseHandlersReturnType = {
  onMouseOver: mouseFunctionSignature;
  onMouseMove: mouseFunctionSignature;
  onMouseLeave: mouseFunctionSignature;
};

type getMouseHandlersSignature = (
  svg: SVGGElement | null,
  tooltip: Selection<HTMLDivElement, unknown, HTMLElement, void>
) => getMouseHandlersReturnType;

const BAR_WIDTH = 6;
const DEFAULT_BAR_OPACITY = 0.6;
const MARGIN = {
  top: 15,
  right: 10,
  bottom: 40,
  left: 22,
};

const MONTH_ABBR = [
  'Jan.',
  'Feb.',
  'Mär.',
  'Apr.',
  'Mai',
  'Jun.',
  'Jul.',
  'Aug.',
  'Sep.',
  'Okt.',
  'Nov.',
  'Dez.',
];

const formatTooltipValue: (val: number) => string = val => `${val.toFixed(1)}l`;
const getMouseHandlers: getMouseHandlersSignature = (svg, tooltip) => ({
  onMouseOver(_evt, d) {
    if (!d.data || !svg) return;
    tooltip.classed('hovered', true);
    select(svg).style('cursor', 'pointer');

    selectAll(`.bar-${d.data.id}`).style('opacity', 1);
  },
  onMouseMove(_evt, d) {
    if (!d.data || !svg) return;
    const { rainValue, wateringValue } = d.data;

    const sum = rainValue + wateringValue;
    tooltip
      .select('#barchart-tooltip-val-watered')
      .text(formatTooltipValue(wateringValue));
    tooltip
      .select('#barchart-tooltip-val-rain')
      .text(formatTooltipValue(rainValue));
    tooltip.select('#barchart-tooltip-val-total').text(formatTooltipValue(sum));
  },
  onMouseLeave(_evt, d) {
    if (!d.data || !svg) return;
    tooltip.classed('hovered', false);
    select(svg).style('cursor', 'default');
    selectAll(`.bar-${d.data.id}`).style('opacity', DEFAULT_BAR_OPACITY);
  },
});

export function drawD3Chart(
  waterAmountInLast30Days: DailyWaterAmountsType[],
  today: Date
): void {
  if (waterAmountInLast30Days === null) return;
  const TODAY = new Date(today.toISOString().split('T')[0]);

  const generateStack = stack<
    DailyWaterAmountsType,
    DailyWaterAmountsType,
    string
  >().keys(['rainValue', 'wateringValue']);
  const stackedData = generateStack(waterAmountInLast30Days);

  const wrapper = select('#barchart');
  if (wrapper === null) {
    return;
  }
  if (wrapper.node() === null) {
    return;
  }

  const width = (wrapper.node() as HTMLElement).clientWidth;
  const height = (wrapper.node() as HTMLElement).clientHeight;
  const chartHeight = height - MARGIN.top - MARGIN.bottom;

  const xScale = scaleTime()
    .domain([
      waterAmountInLast30Days[waterAmountInLast30Days.length - 1].id,
      waterAmountInLast30Days[0].id + 60 * 60 * 24 * 1000,
    ])
    .range([MARGIN.left, width - MARGIN.right]);

  const maxWaterValue = Math.max(
    ...waterAmountInLast30Days.map(
      dayData => dayData.rainValue + dayData.wateringValue
    )
  );

  let yScale: ScaleLinear<number, number>;
  // create dynamic yScales based on maxWaterValue
  // fix scale for watering amounts below 70l
  if (maxWaterValue <= 70) {
    yScale = scaleLinear().domain([0, 70]).rangeRound([chartHeight, 0]);
  } else {
    yScale = scaleLinear()
      .domain([0, maxWaterValue * 1.2])
      .rangeRound([chartHeight, 0]);
  }

  const colorScale = scaleOrdinal<string>()
    .domain(['rainValue', 'wateringValue'])
    .range(['#75ADE8', '#8B77F7']);

  const yTicks = 4;
  // style y and x axis
  const yAxis = axisLeft(yScale).ticks(yTicks).tickSizeInner(3);

  const getXTicks = () => {
    const date = new Date(TODAY);
    return new Array(7)
      .fill(0)
      .map(_ => {
        const timestamp = new Date(date);
        date.setDate(date.getDate() - 5);
        return timestamp;
      })
      .reverse();
  };

  const xAxis = axisBottom<Date>(xScale)
    .tickValues(getXTicks())
    .tickFormat(date => {
      if (date.getTime() === TODAY.getTime()) return 'Heute';
      else return `${date.getDate()}. ${MONTH_ABBR[date.getMonth()]}`;
    })
    .tickSizeOuter(0);

  // remove double loaded svg
  wrapper.selectAll('svg').remove();
  const svg = wrapper.append('svg').attr('width', width).attr('height', height);

  // append y and x axis to chart
  svg
    .append('g')
    .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top} )`)
    .call(yAxis)
    .select('path')
    .attr('stroke', '');

  const xAxisLabels = svg
    .append('g')
    .attr('transform', `translate(12, ${chartHeight + MARGIN.top})`)
    .call(xAxis)
    .selectAll('text');

  xAxisLabels.attr('x', -6);

  // add y axis labeling
  svg
    .append('g')
    .attr('transform', 'translate(0,-5)')
    .append('text')
    .attr('style', 'font-size: 10px;')
    .attr('transform', `translate(2, ${MARGIN.top})`)
    .text('↑ Liter pro m²');

  // add y grid lines
  svg
    .append('g')
    .attr('class', 'grid-lines')
    .selectAll('.grid-line')
    .data(yScale.ticks(yTicks))
    .enter()
    .append('line')
    .attr('class', 'grid-line')
    .attr('transform', `translate(4, ${MARGIN.top + 0.5})`)
    .style('transition', 'opacity 200ms ease-out')
    .attr('x1', 0 + MARGIN.left)
    .attr('x2', width - MARGIN.right + 3)
    .attr('y1', yScale)
    .attr('y2', yScale)
    .style('fill', 'none')
    .style('stroke', 'lightgray')
    .style('stroke-dasharray', '3');

  // manually ad x axis line (fix later)
  svg
    .append('line')
    .style('stroke', 'black')
    .style('stroke-width', 1)
    .attr('x1', MARGIN.left)
    .attr('y1', chartHeight + MARGIN.top + 0.5)
    .attr('x2', width - MARGIN.right + 7)
    .attr('y2', chartHeight + MARGIN.top + 0.5);

  // append stacked rectangles
  const seriesGroup = svg
    .append('g')
    .attr('class', 'series-wrapper')
    .attr('transform', `translate(0, ${MARGIN.top})`);

  const mouseHandlers = getMouseHandlers(
    svg.node(),
    wrapper.select('#barchart-tooltip')
  );

  // Create colour groups in which to render the bars and position on x axis
  const barGroups = seriesGroup
    .selectAll('g')
    .data(stackedData)
    .enter()
    .append('g')
    .attr('fill', (d: { key: string }): string => colorScale(d.key))
    .selectAll('rect')
    .data(d => d)
    .enter()
    .append('g')
    .attr('transform', d => `translate(${xScale(d.data.timestamp)}, 0)`)
    .attr('width', BAR_WIDTH)
    .attr('height', chartHeight);

  // Draw the coloured bars
  barGroups
    .append('rect')
    .attr('x', 3 * (BAR_WIDTH / 2) + 0.5)
    .attr('y', d => yScale(d[1]))
    .attr('class', d => `bar-${d.data.id}`)
    .attr('width', BAR_WIDTH)
    .transition() // transition the width
    .duration(1000) // 1 second
    .attr('height', d => yScale(d[0]) - yScale(d[1]))
    .style('opacity', DEFAULT_BAR_OPACITY);

  // Draw invisible bars that take the full height and can be hovered
  barGroups
    .append('rect')
    .attr('x', 3 * (BAR_WIDTH / 2) + 0.5)
    .attr('y', 0)
    .attr('width', BAR_WIDTH)
    .attr('height', chartHeight)
    .attr('fill', 'transparent')
    .on('mouseover', mouseHandlers.onMouseOver)
    .on('mouseleave', mouseHandlers.onMouseLeave)
    .on('mousemove', mouseHandlers.onMouseMove);
}
