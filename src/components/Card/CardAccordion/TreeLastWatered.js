import React from 'react';
import styled from 'styled-components';

import { convertTime } from '../../../utils/'

import TreeType from './TreeType'
import CardWaterDrops from '../CardWaterDrops'

const StyledTreeType = styled(TreeType)`
  padding-top: 5px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

const WrapperOuter = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  height: fit-content;
  font-weight: bold;
  font-size: ${p => p.theme.fontSizeL};
`;



const TreeLastWatered = p => {
  const { data } = p;

  const calcWaterDrops = amount => {
    switch (amount) {
      case "5":
        return [1]
        break;
      case "10":
        return [1,1]
        break;
      case "25":
        return [1,1,1]
        break;
      case "50":
        return [1,1,1,1]
        break;
      default:
        break;
    }
  }

  return (
    <WrapperOuter>
    {data.map(info => {
      return (
        <Wrapper>
          <Title>{convertTime(info.time)}</Title>
          <CardWaterDrops data={calcWaterDrops(info.amount)} />
          <StyledTreeType>{info.amount}</StyledTreeType>
        </Wrapper>
      )
    })}
    </WrapperOuter>
  );
}

export default TreeLastWatered;