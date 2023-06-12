import Image from 'next/image';
import React, { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { WateringType } from '../../common/interfaces';

import { formatUnixTimestamp } from '../../utils/formatUnixTimestamp';
import useClickOutside from '../../utils/hooks/useClickOutside';
import { useUserData } from '../../utils/hooks/useUserData';
import { useWateringActions } from '../../utils/hooks/useWateringActions';
import SmallParagraph from '../SmallParagraph';

const iconDrop = '/images/icon-drop.svg';
const iconTrashcan = '/images/icon-trashcan.svg';

const StyledTreeType = styled(SmallParagraph)`
  padding: 0;
  padding-left: 5px;
`;

const StyledIcon = styled.img`
  margin-left: 5px;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  border-left: 1px solid ${p => p.theme.colorTextMedium};
  margin-left: 16px;
  cursor: pointer;
  transition: opacity 200ms ease-out;
  opacity: 1;
  padding: 4px 8px;

  &:hover {
    opacity: 0.5;
  }

  &:focus {
    outline: none;
    border-radius: 3px;
    border-left-color: transparent;
    box-shadow: 0 0 0 2px ${p => p.theme.colorAlarm};
  }
`;

const Wrapper = styled.li`
  position: relative;
  width: 100%;
  overflow: hidden;
  height: 32px;
  background: ${p => p.theme.colorAlarm};
`;

const SlideContainer = styled.div<{
  isSlidLeft: boolean;
}>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding: ${p => (p.isSlidLeft ? '0 8px' : '0')};
  background: ${p => p.theme.colorWhite};
  transition: transform 100ms cubic-bezier(0.4, 0, 0.2, 1),
    padding 100ms cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateX(${p => (p.isSlidLeft ? '-50%' : '0')});
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DeleteConfirmButton = styled.button`
  position: absolute;
  width: 50%;
  height: 32px;
  left: 50%;
  top: 0;
  background: ${p => p.theme.colorAlarm};
  color: ${p => p.theme.colorWhite};
  padding: 4px 8px;
  border: none;
  cursor: pointer;
  transition: opacity 200ms ease-out;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }

  &:focus {
    outline: none;s
    box-shadow: 0 0 0 2px ${p => p.theme.colorAlarm};
  }
`;

const WrapperOuter = styled.ol`
  padding-top: 5px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 0;
  padding-ottom: 0;
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

interface WateringRowPropTypes extends WateringType {
  treeId: string;
}

const WateringRow: FC<WateringRowPropTypes> = ({
  id,
  username,
  timestamp,
  amount,
  treeId,
}) => {
  const { userData } = useUserData();
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasClickedDelete, setHasClickedDelete] = useState(false);
  const elRef = useClickOutside<HTMLLIElement>(() => setIsDeleting(false));
  const { unwaterTree } = useWateringActions(treeId);

  const escListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsDeleting(false);
    }
  }, []);

  useEffect(() => {
    if (!isDeleting) {
      document.removeEventListener('keyup', escListener);
    }
    document.addEventListener('keyup', escListener);
    return () => document.removeEventListener('keyup', escListener);
  }, [isDeleting, escListener]);

  if (hasClickedDelete) return null;
  return (
    <Wrapper key={`Lastadopted-key-${id}`} ref={elRef}>
      {isDeleting && (
        <DeleteConfirmButton
          title='Gießung unwiderruflich löschen'
          aria-label='Gießung unwiderruflich löschen'
          onClick={() => {
            setHasClickedDelete(true);
            try {
              unwaterTree(id);
            } catch (error) {
              setHasClickedDelete(false);
            }
          }}
        >
          Löschen
        </DeleteConfirmButton>
      )}
      <SlideContainer isSlidLeft={isDeleting}>
        <FlexRow>
          <Title>{username}</Title>
          <StyledTreeType>({formatUnixTimestamp(timestamp)})</StyledTreeType>
          {userData?.username === username && (
            <DeleteButton
              title='Gießung rückgängig machen'
              onClick={() => setIsDeleting(prev => !prev)}
              aria-label='Gießung rückgängig machen'
            >
              <Image
                src={iconTrashcan}
                alt=''
                aria-hidden
                width={13}
                height={15}
              />
            </DeleteButton>
          )}
        </FlexRow>
        <SmallParagraph>{`${amount}l`}</SmallParagraph>
        <StyledIcon src={iconDrop} aria-hidden />
      </SlideContainer>
    </Wrapper>
  );
};

const UsersWateringsList: FC<{
  waterings: WateringType[];
  treeId: string;
}> = ({ waterings, treeId }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const orderedWaterings = waterings.sort((a, b) => {
    return Date.parse(b.timestamp) - Date.parse(a.timestamp);
  });
  const surpassedMaxItems = orderedWaterings.length > MAX_ITEMS;
  const listItems = isExpanded
    ? orderedWaterings
    : orderedWaterings.slice(0, MAX_ITEMS);

  return (
    <WrapperOuter aria-label='Letzte Bewässerungen (neueste zuerst)'>
      {listItems.map(d => (
        <WateringRow key={d.id} {...d} treeId={treeId} />
      ))}
      {surpassedMaxItems && (
        <ToggleExpansionLink onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded
            ? 'Weniger anzeigen'
            : `${
                orderedWaterings.length - MAX_ITEMS
              } weitere Bewässerungen anzeigen`}
        </ToggleExpansionLink>
      )}
    </WrapperOuter>
  );
};

export default UsersWateringsList;
