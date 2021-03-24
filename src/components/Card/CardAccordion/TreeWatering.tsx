import React, { FC } from 'react';
import styled from 'styled-components';

import content from '../../../assets/content';
import WaterDrops from '../../WaterDrops';

const StyledDescription = styled.p`
  line-height: 150%;
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  letter-spacing: 0.125px;
  padding: 4px 0 8px;
  margin: 0;
`;

const StyledWrapper = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledTitle = styled.h3`
  margin: 0;
  font-weight: bold;
  font-size: ${p => p.theme.fontSizeL};
`;

const StyledTitleText = styled.span`
  display: block;
  padding-top: 4px;
`;

const TreeWatering: FC = () => {
  return (
    <StyledWrapper>
      {content.sidebar.waterNeeds.map(({ title, description }, i) => {
        return (
          <div key={`Tree-watering-${i}`}>
            <StyledTitle>
              <WaterDrops dropsAmount={i + 1} />
              <StyledTitleText>{title}</StyledTitleText>
            </StyledTitle>
            <StyledDescription>{description}</StyledDescription>
          </div>
        );
      })}
    </StyledWrapper>
  );
};

export default TreeWatering;
