import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../state/unistore-hooks';
import { drawD3Chart } from './drawD3Chart';

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

  useEffect(() => {
    console.log(selectedTree);
    console.log(treeLastWatered);
    console.log(waterAmountInLast30Days);
  }, [selectedTree, treeLastWatered, waterAmountInLast30Days]);

  useEffect(() => {
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

    drawD3Chart(waterAmountInLast30Days);
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
