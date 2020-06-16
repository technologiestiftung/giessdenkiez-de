import React from 'react';
import styled from 'styled-components';

import TreeType from './TreeType';
import CardWaterDrops from '../CardWaterDrops';

const StyledTreeType = styled(TreeType)`
  padding-top: 5px;
  margin-bottom: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
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

const TreeWatering = p => {
  const { data } = p;
  return (
    <WrapperOuter>
      {data.map((info, i) => {
        return (
          <Wrapper key={`Tree-watering-${i}`}>
            <CardWaterDrops data={info.waterdrops} />
            <Title>{info.title}</Title>
            <StyledTreeType>{info.description}</StyledTreeType>
          </Wrapper>
        );
      })}
    </WrapperOuter>
  );
};

export default TreeWatering;
