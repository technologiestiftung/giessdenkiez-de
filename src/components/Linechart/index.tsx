import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import {
  // select as d3Select,
  scaleLinear,
  area as d3Area,
  line as d3Line,
  select,
  axisLeft,
  axisBottom,
  ScaleLinear,
} from 'd3';

const LineChartWrapper = styled.div`
  width: 100%;
  height: 140px;
  margin: 5px 0;
`;

const Linechart = p => {
  const { data } = p;
  const [, setScaleTime] = useState<ScaleLinear<number, number> | null>(null);
  const [, setScaleRain] = useState<ScaleLinear<number, number> | null>(null);

  const margin = {
    top: 30,
    right: 15,
    bottom: 40,
    left: 30,
  };

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
      const wrapper = select('#linechart');
      if (wrapper === null) {
        return;
      }
      if (wrapper.node() === null) {
        return;
      }

      const width = (wrapper.node() as HTMLElement).clientWidth;
      const height = (wrapper.node() as HTMLElement).clientHeight;

      const svg = wrapper
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      // const today = new Date();
      // const priorDate = new Date().setDate(today.getDate() - 30);

      const scaleTime = scaleLinear()
        .domain([0, 30]) // @TODO: check the hours of the day
        .range([width - margin.left - margin.right, 0]);
      setScaleTime(() => scaleTime);

      const scaleRain = scaleLinear()
        .domain([0, 100]) // @TODO: check the hours of the day
        .range([height - margin.top - margin.bottom, 0]);
      setScaleRain(() => scaleRain);

      const yAxis = axisLeft(scaleRain).ticks(2);

      const xAxis = axisBottom(scaleTime)
        .tickFormat(d => {
          if (d === 0) {
            return 'Heute';
          } else {
            return `Vor ${d} Tagen`;
          }
        })
        .ticks(3);

      svg
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`)
        .call(yAxis);

      svg
        .append('g')
        .attr(
          'transform',
          `translate(${margin.left}, ${height - margin.bottom})`
        )
        .call(xAxis);

      const areaDefault = d3Area()
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

      linePath.attr('d', line).transition().delay(500).duration(500);
    };
    const transformedData = transformData(data);
    init(transformedData);
    // we explicitly want this hook to only run once on creation
    // of the componenet
  }, []);

  return <LineChartWrapper id='linechart'></LineChartWrapper>;
};

export default Linechart;
