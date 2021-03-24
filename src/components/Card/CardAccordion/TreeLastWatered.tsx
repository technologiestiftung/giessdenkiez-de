import React, { FC } from 'react';
import styled from 'styled-components';
import { WateringType } from '../../../common/interfaces';

import { formatUnixTimestamp } from '../../../utils/formatUnixTimestamp';
import SmallParagraph from '../../SmallParagraph';

const iconDrop = '/images/icon-drop.svg';

const StyledTreeType = styled(SmallParagraph)`
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

const TreeLastWatered: FC<{
  waterings: WateringType[];
}> = ({ waterings }) => (
  <WrapperOuter>
    {waterings.map(
      ({ username, timestamp, amount }: WateringType, i: number) => {
        return (
          <Wrapper key={`Lastadopted-key-${i}`}>
            <FlexRow>
              <Title>{username}</Title>
              <StyledTreeType>
                ({formatUnixTimestamp(timestamp)})
              </StyledTreeType>
            </FlexRow>
            <SmallParagraph>{amount}l</SmallParagraph>
            <StyledIcon src={iconDrop} alt='Water drop icon' />
          </Wrapper>
        );
      }
    )}
  </WrapperOuter>
);

export default TreeLastWatered;
