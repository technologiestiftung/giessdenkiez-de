import React, { FC, useState } from 'react';
import styled from 'styled-components';
import Delete from '@material-ui/icons/Delete'
import { useHistory } from 'react-router';
import { WateringType } from '../../common/interfaces';
import { useCanUpdateWatering } from '../../utils/hooks/useCanUpdateWatering';

import { formatUnixTimestamp } from '../../utils/formatUnixTimestamp';
import SmallParagraph from '../SmallParagraph';
import TreeButton from '../TreeButton';

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
  showTreeName: Boolean,
}> = ({ waterings, showTreeName }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const history = useHistory();
  const { canUpdateWatering } = useCanUpdateWatering();
  const surpassedMaxItems = waterings.length > MAX_ITEMS;
  const sortWaterings = (t1: WateringType, t2: WateringType) => t2.timestamp.localeCompare(t1.timestamp); 
  const listItems = isExpanded ? waterings : waterings.sort(sortWaterings).slice(0, MAX_ITEMS);

  const deleteWatering = async () => {
    await deleteWatering();
  }

  return (
    <WrapperOuter>
      {listItems.map(({ id, username, timestamp, amount, treeId }: WateringType, index: number) => (
        <Wrapper key={`Lastadopted-key-${id}-${index}`}  style={{ height: showTreeName ? "40px": "25px"}}>
          <FlexRow>
            { showTreeName ? <TreeButton
              key={treeId}
              label={treeId}
              onClickHandler={() => {
                history.push(`/tree/${treeId}`);
              }}
            /> : (
              <Title>{username}</Title>
            )}
            <StyledTreeType>({formatUnixTimestamp(timestamp)})</StyledTreeType>
          </FlexRow>
          <SmallParagraph>{`${amount}l`}</SmallParagraph>
          <StyledIcon src={iconDrop} alt='Water drop icon' />
          { canUpdateWatering && (
          <div onClick={() => alert("Delete")} style={{ paddingLeft: '10px', cursor: 'pointer' }}>
            <Delete style={{ fontSize: 14 }} />
          </div>
          )}
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
