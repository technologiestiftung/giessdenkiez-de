import React, { FC } from 'react';
import styled from 'styled-components';

import content from '../../assets/content';
import SmallParagraph from '../SmallParagraph';
import WaterDrops from '../WaterDrops';

const StyledDescription = styled(SmallParagraph)`
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
          <div key={`${title}-${description}`}>
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
