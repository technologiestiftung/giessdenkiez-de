import React, { FC } from 'react';
import styled from 'styled-components';
import store from '../../../state/Store';
import { useStoreState } from '../../../state/unistore-hooks';

import CardDescription from '../CardDescription/';
import SidebarSearchAge from '../../Sidebar/SidebarSearch/SidebarSearchAge';
import SidebarSearchLocation from '../../Sidebar/SidebarSearch/SidebarSearchLocation';

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;

const StyledCardDescription = styled(CardDescription)`
  font-weight: bold;
  font-size: 1rem;
  opacity: 1;
`;

const StyledCardDescriptionSecond = styled(CardDescription)`
  padding-top: 5px;
  margin-bottom: 15px;
`;

const ItemLabel = styled.label`
  font-size: ${p => p.theme.fontSizeL};
  opacity: 0.66;
  padding-top: 5px;
  width: 100%;
`;

const StyledItemLabel = styled(ItemLabel)`
  width: auto;
  padding: 0;
`;

const UnstyledFlex = styled(Flex)`
  border-bottom: none;
  justify-content: flex-start;
  margin-bottom: 0;
`;

interface UnstyledFlexWidthProps {
  active?: boolean;
}
const UnstyledFlexWidth = styled(UnstyledFlex)<UnstyledFlexWidthProps>`
  border-bottom: none;
  width: fit-content;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 6px 9px;
  margin-bottom: 2px;
  cursor: pointer;
  border-radius: 100px;
  background: ${p => (p.active ? p.theme.colorTextMedium : 'white')};
  transition: all 0.125s ease-in-out;

  &:hover {
    background: ${p =>
      p.active ? p.theme.colorGreyLight : p.theme.colorTextMedium};
    transition: all 0.125s ease-in-out;
  }
`;

const Cardlegend: FC = () => {
  const dataView = useStoreState('dataView');

  return (
    <>
      <Flex>
        <StyledCardDescription>Datenansicht</StyledCardDescription>
        <StyledCardDescriptionSecond>
          Betrachte welche Bäume bereits von anderen Nutzern gegossen wurden.
          Oder finde heraus, wieviel Niederschlag die Bäume in den letzten 30
          Tagen erreicht hat.
        </StyledCardDescriptionSecond>
        <UnstyledFlexWidth
          active={dataView === 'rain'}
          onClick={() => {
            store.setState({ dataView: 'rain' });
          }}
        >
          <StyledItemLabel>Niederschläge</StyledItemLabel>
        </UnstyledFlexWidth>
        <UnstyledFlexWidth
          active={dataView === 'adopted'}
          onClick={() => {
            store.setState({ dataView: 'adopted' });
          }}
        >
          <StyledItemLabel>Bereits adoptiert</StyledItemLabel>
        </UnstyledFlexWidth>
        <UnstyledFlexWidth
          active={dataView === 'watered'}
          onClick={() => {
            store.setState({ dataView: 'watered' });
          }}
        >
          <StyledItemLabel>In den letzten 30 Tagen gegossen</StyledItemLabel>
        </UnstyledFlexWidth>
      </Flex>
      <Flex>
        <StyledCardDescription>Baumalter</StyledCardDescription>
        <StyledCardDescriptionSecond>
          Erkunde die Geschichte von Berlins Baumlandschaft
        </StyledCardDescriptionSecond>
        <SidebarSearchAge />
      </Flex>
      <Flex>
        <StyledCardDescription>Standortsuche</StyledCardDescription>
        <SidebarSearchLocation />
      </Flex>
    </>
  );
};

export default Cardlegend;
