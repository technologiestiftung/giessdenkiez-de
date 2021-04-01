import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { WateringType } from '../../common/interfaces';

import { formatUnixTimestamp } from '../../utils/formatUnixTimestamp';
import SmallParagraph from '../SmallParagraph';

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

const Title = styled.h3`
  height: fit-content;
  font-weight: normal;
  font-size: ${p => p.theme.fontSizeL};
`;

const ToggleExpansionLink = styled.button`
  border: 0;
  background: none;
  margin: 0;
  padding: 0;
  text-align: left;
  font-family: inherit;
  font-size: ${p => p.theme.fontSizeL};
  color: ${p => p.theme.colorTextDark};
  text-decoration: underline;
  cursor: pointer;
  text-align: center;
  padding: 8px;
  transition: color 200ms ease-out;
  outline: none;

  &:hover {
    color: ${p => p.theme.colorTextLight};
  }

  &:focus {
    border-radius: 3px;
    box-shadow: 0 0 0 2px ${p => p.theme.colorTextLight};
  }
`;

const MAX_ITEMS = 8;

const UsersWateringsList: FC<{
  waterings: WateringType[];
}> = ({ waterings }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const surpassedMaxItems = waterings.length > MAX_ITEMS;
  const listItems = isExpanded ? waterings : waterings.slice(0, MAX_ITEMS);

  return (
    <WrapperOuter>
      {listItems.map(({ id, username, timestamp, amount }: WateringType) => (
        <Wrapper key={`Lastadopted-key-${id}`}>
          <FlexRow>
            <Title>{username}</Title>
            <StyledTreeType>({formatUnixTimestamp(timestamp)})</StyledTreeType>
          </FlexRow>
          <SmallParagraph>{`${amount}l`}</SmallParagraph>
          <StyledIcon src={iconDrop} alt='Water drop icon' />
        </Wrapper>
      ))}
      {surpassedMaxItems && (
        <ToggleExpansionLink onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded
            ? 'Weniger anzeigen'
            : `${
                waterings.length - MAX_ITEMS
              } zusätzliche Bewässerungen anzeigen`}
        </ToggleExpansionLink>
      )}
    </WrapperOuter>
  );
};

export default UsersWateringsList;
