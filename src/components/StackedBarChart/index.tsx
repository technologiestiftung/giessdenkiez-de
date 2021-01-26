import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import {
  select,
  scaleTime,
  scaleBand,
  scaleLinear,
  scaleOrdinal,
  axisLeft,
  axisBottom,
  timeFormat,
  // timParse,
  stack,
} from 'd3';
import { useStoreState } from '../../state/unistore-hooks';

const dailrain = { '2020-12-30': 10, '2020-12-31': 20 };

const data = [
  {
    timestamp: new Date(2021, 0, 24), // month is zero-indexed :(
    rainValue: 30,
    wateringValue: 30,
  },
  {
    timestamp: new Date(2021, 0, 25),
    rainValue: 10,
    wateringValue: 30,
  },
  {
    timestamp: new Date(2021, 0, 26),
    rainValue: 10,
    wateringValue: 40,
  },
];

// format Date time
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
  > div {
    display: flex;
  }
`;

const StyledLegendCircle = styled.div`
  width: 15px;
  height: 15px;
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
  /* const { data } = p;
  const [, setScaleTime] = useState<ScaleLinear<number, number> | null>(null);
  const [, setScaleRain] = useState<ScaleLinear<number, number> | null>(null); */
  interface DailyWaterAmountsType {
    timestamp: Date;
    rainValue: number;
    wateringValue: number;
  }

  const [waterAmountInLast30Days, setWaterAmountInLast30Days] = useState<
    DailyWaterAmountsType[] | null
  >(null);

  const margin = {
    top: 10,
    right: 15,
    bottom: 40,
    left: 30,
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

    // CONTINUE FROM HERE
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

      const key = waterAmountInLast30Days.map(function (d) {
        return d.timestamp;
      });

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

      const yScale = scaleLinear()
        .domain([0, maxWaterValue * 1.2])
        .rangeRound([height - margin.bottom, margin.top]);

      const colorScale = scaleOrdinal()
        .domain(['rainValue', 'wateringValue'])
        .range(['steelblue', 'blue']);

      wrapper.selectAll('svg').remove();
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
        .attr('y', d => yScale(d[1]))
        .attr('height', d => yScale(d[0]) - yScale(d[1]))
        .attr('width', 5);

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
        .ticks(5)
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
            const formattedTime = formatter(d);
            return formattedTime;
          }
        });

      svg
        .append('g')
        .attr('transform', `translate(${margin.left - 2}, ${margin.top} )`)
        .call(yAxis);

      svg
        .append('g')
        .attr(
          'transform',
          `translate( 0, ${height - margin.bottom + margin.top})`
        )
        .call(xAxis);
    };
    const transformedData = transformData(waterAmountInLast30Days);
    init(transformedData);

    /* return () => {
      document.querySelector('')
    } */
  }, [waterAmountInLast30Days]);

  return (
    <>
      <BarChartWrapper id='barchart'></BarChartWrapper>
      <StyledLegendWrapper>
        <div>
          <StyledLegendCircle
            style={{ backgroundColor: 'steelblue' }}
          ></StyledLegendCircle>
          <div>Regen</div>
        </div>
        <div>
          <StyledLegendCircle
            style={{
              backgroundColor: 'blue',
            }}
          ></StyledLegendCircle>
          <div>Gießungen</div>
        </div>
      </StyledLegendWrapper>
    </>
  );
};

export default StackedBarChart;
