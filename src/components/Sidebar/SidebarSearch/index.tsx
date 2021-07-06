import React, { FC } from 'react';
import styled from 'styled-components';
import SidebarTitle from '../SidebarTitle/';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';
import { useActions, useStoreState } from '../../../state/unistore-hooks';
import SidebarSearchAge from './SidebarSearchAge';
import SidebarSearchLocation from './SidebarSearchLocation';
import WaterDrops from '../../WaterDrops';

const FilterLinksContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 16px;
`;

const FilterLink = styled.span<{ isActive?: boolean }>`
  display: inline-flex;
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

  svg:first-child {
    margin-left: 6px;
  }
`;

const SidebarSearch: FC = () => {
  const mapViewFilter = useStoreState('mapViewFilter');
  const mapWaterNeedFilter = useStoreState('mapWaterNeedFilter');
  const { setMapViewFilter, setMapWaterNeedFilter } = useActions();

  const setWaterNeedFilter = (need: number) => {
    const waterNeed = mapWaterNeedFilter === need ? null : need;
    return setMapWaterNeedFilter(waterNeed);
  }

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
      <ExpandablePanel title='Wasserbedarf' isExpanded>
        <SmallParagraph>
          Finde heraus wie sehr Bäume Wasser benötigen.
        </SmallParagraph>
        <FilterLinksContainer>
          <FilterLink
            isActive={mapWaterNeedFilter === 1}
            onClick={() => setWaterNeedFilter(1) }
          >
            Niedrig
            <WaterDrops dropsAmount={1} />
          </FilterLink>
          <FilterLink
            isActive={mapWaterNeedFilter === 2}
            onClick={() => setWaterNeedFilter(2) }
          >
            Mittel
            <WaterDrops dropsAmount={2} />
          </FilterLink>
          <FilterLink
            isActive={mapWaterNeedFilter === 3}
            onClick={() => setWaterNeedFilter(3) }
          >
            Hoch
            <WaterDrops dropsAmount={3} />
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
