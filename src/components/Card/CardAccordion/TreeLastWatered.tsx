import React from 'react';
import styled from 'styled-components';

import { convertTime } from '../../../utils/';

import TreeType from './TreeType';

const iconDrop = '/images/icon-drop.svg';

const StyledTreeType = styled(TreeType)`
  padding: 0;
  padding-left: 5px;
`;

const StyledIcon = styled.img`
  margin-left: 5px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 25px;
  align-items: center;
  justify-content: space-between;
`;

const WrapperOuter = styled.div`
  padding-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const FlexRow = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: row;
`;

const Title = styled.span`
  height: fit-content;
  font-weight: normal;
  font-size: ${p => p.theme.fontSizeL};
`;

const TreeLastWatered = (p: { data: any }) => {
  const { data } = p;

  const calcWaterDrops = (amount: string) => {
    switch (amount) {
      case '5':
        return [1];
      case '10':
        return [1, 1];
      case '25':
        return [1, 1, 1];
      case '50':
        return [1, 1, 1, 1];
      default:
        return undefined;
    }
  };

  return (
    <WrapperOuter>
      {data.map((info: any, i: number) => {
        return (
          <Wrapper key={`Lastadopted-key-${i}`}>
            <FlexRow>
              <Title>{info.username}</Title>
              <StyledTreeType>({convertTime(info.timestamp)})</StyledTreeType>
            </FlexRow>
            <TreeType>{info.amount}l</TreeType>
            <StyledIcon src={iconDrop} alt='Water drop icon' />
          </Wrapper>
        );
      })}
    </WrapperOuter>
  );
};

export default TreeLastWatered;
