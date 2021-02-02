import {
  select,
  scaleTime,
  scaleLinear,
  scaleOrdinal,
  axisLeft,
  axisBottom,
  stack,
  ScaleLinear,
} from 'd3';
import { DailyWaterAmountsType } from './mapStackedBarchartData';

const margin = {
  top: 15,
  right: 10,
  bottom: 40,
  left: 22,
};
// helper function for interaction
function mouseOver(
  _: unknown,
  __: number,
  groups: SVGGElement[] | ArrayLike<SVGGElement>
) {
  const allBars = select('.series-wrapper').selectAll('g');
  const selectedBar = select(groups[0]);
  selectedBar.style('opacity', 1).style('cursor', 'pointer');

  selectedBar
    .append('text')
    .attr('x', 20)
    .attr('y', 50)
    .attr('text', 'this is my tooltip')
    .style('color', 'black');

  console.log('allBars:', allBars);
  console.log('selectedBar', selectedBar);

  console.log('inside function');
}

function mouseOut(
  _: unknown,
  __: number,
  groups: SVGGElement[] | ArrayLike<SVGGElement>
) {
  const selectedBar = select(groups[0]);

  selectedBar.style('opacity', 0.8);

  console.log('I am out');
}

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

  const xScale = scaleTime()
    .domain([
      waterAmountInLast30Days[waterAmountInLast30Days.length - 1].timestamp,
      waterAmountInLast30Days[0].timestamp,
    ])
    .range([margin.left, width - margin.right]);

  const maxWaterValue = Math.max(
    ...waterAmountInLast30Days.map(
      dayData => dayData.rainValue + dayData.wateringValue
    )
  );

  let yScale: ScaleLinear<number, number>;
  // create dynamic yScales based on maxWaterValue
  // fix scale for watering amounts below 70l
  if (maxWaterValue <= 70) {
    yScale = scaleLinear()
      .domain([0, 70])
      .rangeRound([height - margin.bottom, margin.top]);
  } else {
    yScale = scaleLinear()
      .domain([0, maxWaterValue * 1.2])
      .rangeRound([height - margin.bottom, margin.top]);
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
    .attr('transform', `translate(${margin.left}, ${margin.top} )`)
    .call(yAxis);

  svg
    .append('g')
    .attr('transform', `translate( 0, ${height - margin.bottom + margin.top})`)
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
    .attr('transform', `translate(${2},${margin.top})`)
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
    .attr('transform', `translate(${4}, ${margin.top + 0.5})`)
    .attr('x1', 0 + margin.left)
    .attr('x2', width - margin.right + 3)
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
    .attr('x1', margin.left)
    .attr('y1', height - margin.bottom + margin.top + 0.5)
    .attr('x2', width - margin.right + 7)
    .attr('y2', height - margin.bottom + margin.top + 0.5);

  // append stacked rectangles
  const seriesGroup = svg
    .append('g')
    .attr('class', 'series-wrapper')
    .attr('transform', `translate(0, ${margin.top})`);

  seriesGroup
    .selectAll('g')
    .data(stackedData)
    .enter()
    .append('g')
    .attr('fill', (d: { key: string }): string => colorScale(d.key))
    .selectAll('rect')
    .data(d => d)
    .enter()
    .append('rect')
    .attr('x', d => xScale(d.data.timestamp))
    .attr('width', 6)
    .transition() // transition the width
    .duration(1000) // 1 second
    .attr('height', d => yScale(d[0]) - yScale(d[1]))
    .attr('y', d => yScale(d[1]))
    .style('opacity', 0.8);

  seriesGroup.on('mouseover', mouseOver).on('mouseout', mouseOut);
}
