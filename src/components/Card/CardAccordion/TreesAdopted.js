import React from 'react';
import styled from 'styled-components';

import TreeType from './TreeType'
import CardWaterDrops from '../CardWaterDrops'

const StyledTreeType = styled(TreeType)`
  margin-bottom: 10px;
  padding: 0;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const WrapperOuter = styled.div`
  padding-top: 5px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  height: fit-content;
  font-weight: normal;
  font-size: ${p => p.theme.fontSizeL};
`;


const TreesAdopted = p => {
  const { data } = p;
  return (
    <WrapperOuter>
    {data.map(info => {
      return (
        <Wrapper>
          <Title>{info.artdtsch}</Title>
          <StyledTreeType>{info.strname} {info.radolan_sum}l</StyledTreeType>
        </Wrapper>
      )
    })}
    </WrapperOuter>
  );
}

export default TreesAdopted;