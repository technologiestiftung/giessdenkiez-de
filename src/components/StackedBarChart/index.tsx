import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  select,
  selectAll,
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

// to create Date out of String
// const parser = timeParse('%Y-%m-%d');
// to create string out of Date
const formatter = timeFormat('%d.%m.');

const BarChartWrapper = styled.div`
  width: 100%;
  height: 140px;
  margin: 5px 0;
`;

const StyledLegendWrapper = styled.div`
  display: flex;
  padding-bottom: 1em;
  > div {
    display: flex;
    font-size: 10px;
    padding-right: 1em;
  }
`;

const StyledLegendCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;

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

const createDateList = (len: number) => {
  const today = new Date();
  let iter = 1;
  const last30Dates: string[] = [];
  while (iter < 1 + len) {
    const priorDate = new Date().setDate(today.getDate() - iter);

    last30Dates.push(new Date(priorDate).toISOString().split('T')[0]);
    iter++;
  }
  return last30Dates;
};

const _createRadolanMap: (
  radolanDays: number[]
) => { [key: string]: number } = radolanDays => {
  const rainOfMonth = transformData(radolanDays);
  const last30Days = createDateList(rainOfMonth.length);
  const map = {};
  rainOfMonth.forEach((ele, i) => {
    map[last30Days[i]] = ele;
  });
  return map;
};

const timestamp2stringKey = (timestamp: string): string =>
  timestamp.split('T')[0];

type WateredDayType = {
  tree_id: string;
  time: string;
  uuid: string;
  amount: string;
  timestamp: string;
  username: string;
};

const _createTreeLastWateredMap = (
  treeLastWatered: WateredDayType[]
): { [key: string]: number } =>
  treeLastWatered.reduce(
    (acc, currentDay) => ({
      ...acc,
      [timestamp2stringKey(currentDay.timestamp)]: parseInt(
        currentDay.amount,
        10
      ),
    }),
    {}
  );

const StackedBarChart = () => {
  const { selectedTree } = useStoreState('selectedTree');
  const { treeLastWatered } = useStoreState('treeLastWatered');
  interface DailyWaterAmountsType {
    timestamp: Date;
    rainValue: number;
    wateringValue: number;
  }

  const [waterAmountInLast30Days, setWaterAmountInLast30Days] = useState<
    DailyWaterAmountsType[] | null
  >(null);

  const margin = {
    top: 15,
    right: 10,
    bottom: 40,
    left: 22,
  };

  useEffect(() => {
    console.log(selectedTree);
    console.log(treeLastWatered);
    console.log(waterAmountInLast30Days);
  }, [selectedTree, treeLastWatered, waterAmountInLast30Days]);

  useEffect(() => {
    console.log(selectedTree);
    console.log(transformData(selectedTree.radolan_days));
    if (!treeLastWatered) return;

    const treeLastWateredMap = _createTreeLastWateredMap(treeLastWatered);
    const selectedTreeMap = _createRadolanMap(selectedTree.radolan_days);

    setWaterAmountInLast30Days(
      Object.keys(selectedTreeMap).map(selectedTreeKey => {
        const dailyAmount = selectedTreeMap[selectedTreeKey];

        return {
          timestamp: new Date(selectedTreeKey),
          rainValue: dailyAmount,
          wateringValue: treeLastWateredMap[selectedTreeKey] || 0,
        };
      })
    );
  }, [selectedTree, treeLastWatered]);

  useEffect(() => {
    if (waterAmountInLast30Days === null) return;

    // create new stack generator
    const generateStack = stack().keys(['rainValue', 'wateringValue']);
    const stackedData = generateStack(waterAmountInLast30Days);

    const init = _incomingData => {
      const wrapper = select('#barchart');
      if (wrapper === null) {
        return;
      }
      if (wrapper.node() === null) {
        return;
      }

      const width = (wrapper.node() as HTMLElement).clientWidth;
      const height = (wrapper.node() as HTMLElement).clientHeight;

      // const key = waterAmountInLast30Days.map(function (d) {
      //   return d.timestamp;
      // });

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

      let yScale;
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

      const colorScale = scaleOrdinal()
        .domain(['rainValue', 'wateringValue'])
        .range(['#75ADE8', '#8B77F7']);

      const yTicks = 4;
      // style y and x axis
      const yAxis = axisLeft(yScale).ticks(yTicks);

      const xAxis = axisBottom(xScale)
        .ticks(6)
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
            // let formattedTime = formatter(d);
            let daysBack = today.getTime() - formattedDate.getTime();
            daysBack = daysBack / (1000 * 3600 * 24);
            daysBack = Math.round(daysBack);
            //
            return `Vor ${daysBack} Tagen`;
            // return formattedTime;
          }
        });

      // remove double loaded svg
      wrapper.selectAll('svg').remove();
      const svg = wrapper
        .append('svg')
        .attr('width', width)
        .attr('height', height);

      // append y and x axis to chart
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
        .attr('fill', function (d) {
          return colorScale(d.key);
        })
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

      // helper function for interaction
      function mouseOver() {
        let allBars = select('.series-wrapper').selectAll('g');
        let selectedBar = select(this);

        selectedBar.style('opacity', 1).style('cursor', 'pointer');

        selectedBar
          .append('text')
          .attr('x', 20)
          .attr('y', 50)
          .attr('text', 'this is my tooltip')
          .style('color', 'black');

        console.log('allBars:', allBars);
        console.log('selectedBar', selectedBar);
        console.log(selectedBar == allBars);

        console.log('inside function');
      }

      function mouseOut() {
        let allBars = select('.series-wrapper').selectAll('g');
        let selectedBar = select(this);

        selectedBar.style('opacity', 0.8);

        console.log('I am out');
      }
    };
    const transformedData = transformData(waterAmountInLast30Days);
    init(transformedData);
  }, [waterAmountInLast30Days]);

  return (
    <>
      <BarChartWrapper id='barchart'></BarChartWrapper>
      <StyledLegendWrapper>
        <div>
          <StyledLegendCircle
            style={{ backgroundColor: '#75ADE8' }} // waterdrop blue
          ></StyledLegendCircle>
          <div>&nbsp;Regen</div>
        </div>
        <div>
          <StyledLegendCircle
            style={{
              backgroundColor: '#8B77F7', // light citylab primary color
            }}
          ></StyledLegendCircle>
          <div>&nbsp;Gießungen</div>
        </div>
      </StyledLegendWrapper>
    </>
  );
};

export default StackedBarChart;
