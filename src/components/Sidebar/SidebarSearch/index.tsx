import React, { FC } from 'react';
import styled from 'styled-components';
import SidebarTitle from '../SidebarTitle/';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';
import { useActions, useStoreState } from '../../../state/unistore-hooks';
import SidebarSearchAge from './SidebarSearchAge';
import SidebarSearchLocation from './SidebarSearchLocation';
import WaterDrops from '../../WaterDrops';
import useLocalizedContent from '../../../utils/hooks/useLocalizedContent';

const FilterLinksContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 16px;
`;

const FilterLink = styled.span<{ $isActive?: boolean }>`
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 16px;
  cursor: pointer;
  font-size: ${p => p.theme.fontSizeL};
  background: ${p => (p.$isActive ? p.theme.colorTextMedium : 'white')};
  color: ${p => (p.$isActive ? p.theme.colorTextDark : p.theme.colorTextLight)};
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
  const content = useLocalizedContent();
  const {
    title,
    locationSearchTitle,
    dataViewTitle,
    dataViewDescription,
    precipitation,
    adopted,
    lastWatered,
    waterNeedsTitle,
    waterNeedsDescription,
    waterNeeds,
    treeAgeTitle,
    treeAgeDescription,
  } = content.sidebar;

  const mapViewFilter = useStoreState('mapViewFilter');
  const mapWaterNeedFilter = useStoreState('mapWaterNeedFilter');
  const { setMapViewFilter, setMapWaterNeedFilter } = useActions();

  const setWaterNeedFilter = (need: number) => {
    const waterNeed = mapWaterNeedFilter === need ? null : need;
    return setMapWaterNeedFilter(waterNeed);
  };

  return (
    <>
      <SidebarTitle>{title}</SidebarTitle>
      <ExpandablePanel title={locationSearchTitle} $isExpanded>
        <SidebarSearchLocation />
      </ExpandablePanel>
      <ExpandablePanel title={dataViewTitle} $isExpanded>
        <SmallParagraph>{dataViewDescription}</SmallParagraph>
        <FilterLinksContainer>
          <FilterLink
            $isActive={mapViewFilter === 'rain'}
            onClick={() => setMapViewFilter('rain')}
          >
            {precipitation}
          </FilterLink>
          <FilterLink
            $isActive={mapViewFilter === 'adopted'}
            onClick={() => setMapViewFilter('adopted')}
          >
            {adopted}
          </FilterLink>
          <FilterLink
            $isActive={mapViewFilter === 'watered'}
            onClick={() => setMapViewFilter('watered')}
          >
            {lastWatered}
          </FilterLink>
        </FilterLinksContainer>
      </ExpandablePanel>
      <ExpandablePanel title={waterNeedsTitle} $isExpanded>
        <SmallParagraph>{waterNeedsDescription}</SmallParagraph>
        <FilterLinksContainer>
          <FilterLink
            $isActive={mapWaterNeedFilter === 1}
            onClick={() => setWaterNeedFilter(1)}
          >
            {waterNeeds[0].title}
            <WaterDrops dropsAmount={1} />
          </FilterLink>
          <FilterLink
            $isActive={mapWaterNeedFilter === 2}
            onClick={() => setWaterNeedFilter(2)}
          >
            {waterNeeds[1].title}
            <WaterDrops dropsAmount={2} />
          </FilterLink>
          <FilterLink
            $isActive={mapWaterNeedFilter === 3}
            onClick={() => setWaterNeedFilter(3)}
          >
            {waterNeeds[2].title}
            <WaterDrops dropsAmount={3} />
          </FilterLink>
        </FilterLinksContainer>
      </ExpandablePanel>
      <ExpandablePanel title={treeAgeTitle} $isExpanded>
        <SmallParagraph>{treeAgeDescription}</SmallParagraph>
        <br />
        <SidebarSearchAge />
      </ExpandablePanel>
    </>
  );
};

export default SidebarSearch;
