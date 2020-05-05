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

  if (data.length === 0) {
    return (
      <WrapperOuter>
        <Title>Du hast noch keine Bäume abonniert.</Title>
      </WrapperOuter>
    )
  } else {
    return (
      <WrapperOuter>
      {data.map(info => {
        return (
          <Wrapper>
            <Title>{info.artdtsch}</Title>
            <StyledTreeType>{info.strname == 'undefined' ? '' : info.strname}</StyledTreeType>
          </Wrapper>
        )
      })}
      </WrapperOuter>
    );
  }

}

export default TreesAdopted;