import React, { useEffect } from 'react';
/* import styled from 'styled-components'; */

import d3, {
  select,
  scaleTime,
  scaleLinear,
  scaleOrdinal,
  axisLeft,
  axisBottom,
  timeFormat,
  // timParse,
  stack,
} from 'd3';
import { useStoreState } from '../../state/unistore-hooks';

const data = [
  {
    day: new Date(2021, 0, 24), // month is zero-indexed :(
    rainValue: 30,
    wateringValue: 30,
  },
  {
    day: new Date(2021, 0, 25),
    rainValue: 10,
    wateringValue: 30,
  },
  {
    day: new Date(2021, 0, 26),
    rainValue: 10,
    wateringValue: 40,
  },
];

// format Date time
// to create Date out of String
// const parser = timeParse('%Y-%m-%d');
// to create string out of Date
const formatter = timeFormat('%d-%m');

// let myDates = [];

// data.forEach(function (d) {
//   const dayString = formatter(d.day);
//   myDates.push(dayString);
// });

// console.log('this is my dates:', myDates);

// CONTINUE FROM HERE
// create new stack generator
const generateStack = stack().keys(['rainValue', 'wateringValue']);
const stackedData = generateStack(data);

/* const LineChartWrapper = styled.div`
  width: 100%;
  height: 140px;
  margin: 5px 0;
`; */

const StackedBarChart = (p: any) => {
  const selectedTree = useStoreState('selectedTree');
  const treeLastWatered = useStoreState('treeLastWatered');
  /* const { data } = p;
  const [, setScaleTime] = useState<ScaleLinear<number, number> | null>(null);
  const [, setScaleRain] = useState<ScaleLinear<number, number> | null>(null); */

  const margin = {
    top: 10,
    right: 15,
    bottom: 40,
    left: 30,
  };
  useEffect(() => {
    console.log(selectedTree);
    console.log(treeLastWatered);
  }, [selectedTree, treeLastWatered]);
  useEffect(() => {
    if (data === undefined) return;

    const transformData = d => {
      let sumPerDay = 0;

      const hours: number[] = [];

      if (d) {
        // aggregate hours to days
        d.forEach((hour, i) => {
          sumPerDay += hour;
          const fullDay = i % 24 === 23;
          if (fullDay) {
            const sum = sumPerDay;
            sumPerDay = 0;
            hours.push(sum);
          }
        });
      }

      return hours.reverse();
    };

    const init = incomingData => {
      const wrapper = select('#barchart');
      if (wrapper === null) {
        return;
      }
      if (wrapper.node() === null) {
        return;
      }

      const width = (wrapper.node() as HTMLElement).clientWidth;
      const height = 300;
      // FIX LATER
      // const height = (wrapper.node() as HTMLElement).clientHeight;
      console.log(width, height);

      const key = data.map(function (d) {
        return d.day;
      });

      const xScale = scaleTime()
        .domain([data[0].day, data[data.length - 1].day])
        .range([margin.left, width - margin.right]);

      const yScale = scaleLinear()
        .domain([0, 100]) //max value rainfall
        .rangeRound([height - margin.bottom, margin.top]);

      const colorScale = scaleOrdinal()
        .domain(['rainValue', 'wateringValue'])
        .range(['steelblue', 'blue']);

      const svg = wrapper
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      svg
        .append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', width)
        .attr('height', height)
        .style('fill', 'lightgrey');

      // append stacked rectangles
      const seriesGroup = svg.append('g').attr('class', 'series-wrapper');

      seriesGroup
        .selectAll('g')
        .data(stackedData)
        .enter()
        .append('g')
        .attr('fill', function (d) {
          return colorScale(d.key);
        })
        .selectAll('rect')
        .data(d => d)
        .enter()
        .append('rect')
        .attr('x', d => xScale(d.data.day))
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]))
        .attr('width', 20);

      // seriesGroup
      //   .selectAll('rect')
      //   .datum(d => d)
      //   .join('rect')
      //   .attr('width', 40)
      //   .attr('y', d => yScale(d[1]))
      //   .attr('x', d => xScale(d.data.day) - 20)
      //   .attr('height', d => yScale(d[0]) - yScale(d[1]));

      // const today = new Date();
      // const priorDate = new Date().setDate(today.getDate() - 30);

      /* const scaleTime = scaleLinear()
        .domain([0, 30]) // @TODO: check the hours of the day
        .range([width - margin.left - margin.right, 0]);
      setScaleTime(() => scaleTime);

      const scaleRain = scaleLinear()
        .domain([0, 100]) // @TODO: check the hours of the day
        .range([height - margin.top - margin.bottom, 0]);
      setScaleRain(() => scaleRain); */

      const yAxis = axisLeft(yScale).ticks(2);

      const xAxis = axisBottom(xScale)
        .ticks(2)
        .tickFormat(d => {
          // get sysdate for x Axis
          const today = new Date();
          const formattedDate = new Date(d);

          const dateIsToday =
            formattedDate.getFullYear() === today.getFullYear() &&
            formattedDate.getMonth() === today.getMonth() &&
            formattedDate.getDate() === today.getDate();

          if (dateIsToday) {
            return 'Heute';
          } else if (d !== null) {
            //const differenceToToday =
            const formattedTime = formatter(d);
            // replace with Date
            return formattedTime;
          }
        });

      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top} )`)
        .call(yAxis);

      svg
        .append('g')
        .attr(
          'transform',
          `translate( 0, ${height - margin.bottom + margin.top})`
        )
        .call(xAxis);

      // svg.append();

      /* const areaDefault = d3Area()
        .x((d, i) => scaleTime(i))
        .y0(d => scaleRain(0))
        .y1(70);

      const area = d3Area()
        .x((d, i) => scaleTime(i))
        .y0(d => scaleRain(d))
        .y1(70);

      svg
        .append('g')
        .append('text')
        .attr('style', 'font-size: 10px;')
        .attr('transform', `translate(${2},${20})`)
        .text('↑ Liter pro m²');

      // areaShape
      const areaPath = svg
        .append('path')
        .datum(incomingData)
        .attr('fill', 'url(#linear-gradient)')
        .attr('opacity', '1')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('id', `rain-areaShape`)
        .attr('class', 'area')
        .attr('d', areaDefault)
        .transition()
        .duration(500);

      areaPath.attr('d', area).transition().delay(500).duration(500);

      svg
        .append('linearGradient')
        .attr('id', 'linear-gradient')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 0)
        .attr('y1', scaleRain(100))
        .attr('x2', 0)
        .attr('y2', scaleRain(0))
        .selectAll('stop')
        .data([
          { offset: '0%', color: '#75ADE8' },
          { offset: '100%', color: '#FFFFFF' },
        ])
        .enter()
        .append('stop')
        .attr('offset', d => d.offset)
        .attr('stop-color', d => d.color);

      const line = d3Line()
        .x((_d, i) => {
          return scaleTime(i);
        })
        .y((d, _i) => {
          return scaleRain(d);
        });

      const lineDefault = d3Line()
        .x((_d, i) => {
          return scaleTime(i);
        })
        .y((d, _i) => {
          return scaleRain(0);
        });

      // linechape
      const linePath = svg
        .append('path')
        .datum(incomingData)
        .attr('fill', 'none')
        .attr('stroke', '#75ADE8')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .attr('stroke-width', 2)
        .attr('stroke-linejoin', 'round')
        .attr('stroke-linecap', 'round')
        .attr('d', lineDefault)
        .transition()
        .duration(500);

      linePath.attr('d', line).transition().delay(500).duration(500); */
    };
    const transformedData = transformData(data);
    init(transformedData);
    // we explicitly want this hook to only run once on creation
    // of the componenet
  }, []);

  return <div id='barchart'></div>;
};

export default StackedBarChart;
