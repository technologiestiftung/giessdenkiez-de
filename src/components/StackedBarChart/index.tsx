import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { DailyWaterAmountsType } from '../../common/types';
import { useStoreState } from '../../state/unistore-hooks';
import { drawD3Chart } from './drawD3Chart';
import { mapStackedBarchartData } from './mapStackedBarchartData';

const BarChartWrapper = styled.div`
  width: 100%;
  height: 140px;
  margin: 5px 0;
  position: relative;
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

const StackedBarChart: FC = () => {
  const { selectedTree } = useStoreState('selectedTree');
  const { treeLastWatered } = useStoreState('treeLastWatered');

  const [waterAmountInLast30Days, setWaterAmountInLast30Days] = useState<
    DailyWaterAmountsType[] | null
  >(null);

  useEffect(() => {
    if (!treeLastWatered || !treeLastWatered) return;

    setWaterAmountInLast30Days(
      mapStackedBarchartData({ selectedTree, treeLastWatered })
    );
  }, [selectedTree, treeLastWatered]);

  useEffect(() => {
    if (waterAmountInLast30Days === null) return;

    drawD3Chart(waterAmountInLast30Days);
  }, [waterAmountInLast30Days]);

  return (
    <>
      <BarChartWrapper id='barchart' />
      <StyledLegendWrapper>
        <div>
          <StyledLegendCircle
            style={{
              backgroundColor: '#8B77F7', // light citylab primary color
            }}
          ></StyledLegendCircle>
          <div>&nbsp;Gießungen</div>
        </div>
        <div>
          <StyledLegendCircle
            style={{ backgroundColor: '#75ADE8' }} // waterdrop blue
          ></StyledLegendCircle>
          <div>&nbsp;Regen</div>
        </div>
      </StyledLegendWrapper>
    </>
  );
};

export default StackedBarChart;
