import React, { FC } from 'react';
import styled from 'styled-components';

import content from '../../../assets/content';
import TreeType from './TreeType';
import WaterDrops from '../../WaterDrops';

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

const TreeWatering: FC = () => {
  return (
    <WrapperOuter>
      {content.sidebar.waterNeeds.map(({ title, description }, i) => {
        return (
          <Wrapper key={`Tree-watering-${i}`}>
            <WaterDrops dropsAmount={i + 1} />
            <Title>{title}</Title>
            <StyledTreeType>{description}</StyledTreeType>
          </Wrapper>
        );
      })}
    </WrapperOuter>
  );
};

export default TreeWatering;
