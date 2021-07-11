import React, { FC } from 'react';
import styled from 'styled-components';
import SidebarTitle from '../SidebarTitle/';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';
import { useActions, useStoreState } from '../../../state/unistore-hooks';
import SidebarSearchAge from './SidebarSearchAge';
import SidebarSearchLocation from './SidebarSearchLocation';

const FilterLinksContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 16px;
`;

const FilterLink = styled.span<{ isActive?: boolean }>`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 16px;
  cursor: pointer;
  font-size: ${p => p.theme.fontSizeL};
  background: ${p => (p.isActive ? p.theme.colorTextMedium : 'white')};
  color: ${p => (p.isActive ? p.theme.colorTextDark : p.theme.colorTextLight)};
  transition: all 0.125s ease-in-out;

  &:hover {
    background: ${p => p.theme.colorGreyLight};
    transition: all 0.125s ease-in-out;
  }
`;

const SidebarSearch: FC = () => {
  const mapViewFilter = useStoreState('mapViewFilter');
  const { setMapViewFilter } = useActions();

  return (
    <>
      <SidebarTitle>Suche & Filter</SidebarTitle>
      <ExpandablePanel title='Datenansicht' isExpanded>
        <SmallParagraph>
          Betrachte welche Bäume bereits von anderen Nutzern gegossen wurden.
          Oder finde heraus, wieviel Niederschlag die Bäume in den letzten 30
          Tagen erreicht hat.
        </SmallParagraph>
        <FilterLinksContainer>
          <FilterLink
            isActive={mapViewFilter === 'rain'}
            onClick={() => setMapViewFilter('rain')}
          >
            Niederschläge
          </FilterLink>
          <FilterLink
            isActive={mapViewFilter === 'adopted'}
            onClick={() => setMapViewFilter('adopted')}
          >
            Bereits adoptiert
          </FilterLink>
          <FilterLink
            isActive={mapViewFilter === 'watered'}
            onClick={() => setMapViewFilter('watered')}
          >
            In den letzten 30 Tagen gegossen
          </FilterLink>
        </FilterLinksContainer>
      </ExpandablePanel>
      <ExpandablePanel title='Baumalter' isExpanded>
        <SmallParagraph>
          Erkunde die Geschichte von Berlins Baumlandschaft
        </SmallParagraph>
        <br />
        <SidebarSearchAge />
      </ExpandablePanel>
      <ExpandablePanel title='Standortsuche' isExpanded>
        <SidebarSearchLocation />
      </ExpandablePanel>
    </>
  );
};

export default SidebarSearch;
