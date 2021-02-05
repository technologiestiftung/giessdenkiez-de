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

const formatTooltipValue: (val: number) => string = val => `${val.toFixed(1)}l`;
const getMouseHandlers: getMouseHandlersSignature = (svg, tooltip) => ({
  onMouseOver(d) {
    if (!d.data || !svg) return;
    tooltip.classed('hovered', true);
    select(svg).style('cursor', 'pointer');

    selectAll(`.bar-${d.data.id}`).style('opacity', 1);
  },
  onMouseMove(d) {
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
  onMouseLeave(d) {
    if (!d.data || !svg) return;
    tooltip.classed('hovered', false);
    select(svg).style('cursor', 'default');
    selectAll(`.bar-${d.data.id}`).style('opacity', DEFAULT_BAR_OPACITY);
  },
});

export function drawD3Chart(
  waterAmountInLast30Days: DailyWaterAmountsType[]
): void {
  if (waterAmountInLast30Days === null) return;

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
      waterAmountInLast30Days[waterAmountInLast30Days.length - 1].timestamp,
      waterAmountInLast30Days[0].timestamp,
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
  const yAxis = axisLeft(yScale).ticks(yTicks);

  const xAxis = axisBottom<Date>(xScale)
    .ticks(6)
    .tickFormat((tickDate: Date): string => {
      // get sysdate for x Axis
      const today = new Date();

      const dateIsToday =
        tickDate.getFullYear() === today.getFullYear() &&
        tickDate.getMonth() === today.getMonth() &&
        tickDate.getDate() === today.getDate();

      if (dateIsToday) {
        return 'Heute';
      }
      // let formattedTime = formatter(d);
      let daysBack = today.getTime() - tickDate.getTime();
      daysBack = daysBack / (1000 * 3600 * 24);
      daysBack = Math.round(daysBack);
      //
      return `Vor ${daysBack} Tagen`;
      // return formattedTime;
    });

  // remove double loaded svg
  wrapper.selectAll('svg').remove();
  const svg = wrapper.append('svg').attr('width', width).attr('height', height);

  // append y and x axis to chart
  svg
    .append('g')
    .attr('transform', `translate(${MARGIN.left}, ${MARGIN.top} )`)
    .call(yAxis);

  svg
    .append('g')
    .attr(
      'transform',
      `translate(${BAR_WIDTH / 2}, ${chartHeight + MARGIN.top})`
    )
    .call(xAxis);

  // rect so see dimensions of svg
  // svg
  //   .append('rect')
  //   .attr('x', 0)
  //   .attr('y', 0)
  //   .attr('width', width)
  //   .attr('height', height)
  //   .style('fill', 'lightgrey');

  // add y axis labeling
  svg
    .append('g')
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
    .attr('x', 0)
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
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', BAR_WIDTH)
    .attr('height', chartHeight)
    .attr('fill', 'transparent')
    .on('mouseover', mouseHandlers.onMouseOver)
    .on('mouseleave', mouseHandlers.onMouseLeave)
    .on('mousemove', mouseHandlers.onMouseMove);
}
