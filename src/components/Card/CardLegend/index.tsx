import React, { FC } from 'react';
import styled from 'styled-components';
import store from '../../../state/Store';
import { useStoreState } from '../../../state/unistore-hooks';

import SidebarSearchAge from '../../Sidebar/SidebarSearch/SidebarSearchAge';
import SidebarSearchLocation from '../../Sidebar/SidebarSearch/SidebarSearchLocation';
import ExpandablePanel from '../../ExpandablePanel';
import SmallParagraph from '../../SmallParagraph';

const FilterLinksContainer = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-start;
  flex-wrap: wrap;
  padding-top: 16px;
`;

interface FilterLinkProps {
  active?: boolean;
}
const FilterLink = styled.span<FilterLinkProps>`
  display: inline-block;
  padding: 6px 10px;
  border-radius: 16px;
  cursor: pointer;
  font-size: ${p => p.theme.fontSizeL};
  background: ${p => (p.active ? p.theme.colorTextMedium : 'white')};
  color: ${p => (p.active ? p.theme.colorTextDark : p.theme.colorTextLight)};
  transition: all 0.125s ease-in-out;

  &:hover {
    background: ${p => p.theme.colorGreyLight};
    transition: all 0.125s ease-in-out;
  }
`;

const Cardlegend: FC = () => {
  const dataView = useStoreState('dataView');

  return (
    <>
      <ExpandablePanel title='Datenansicht' isExpanded>
        <SmallParagraph>
          Betrachte welche Bäume bereits von anderen Nutzern gegossen wurden.
          Oder finde heraus, wieviel Niederschlag die Bäume in den letzten 30
          Tagen erreicht hat.
        </SmallParagraph>
        <FilterLinksContainer>
          <FilterLink
            active={dataView === 'rain'}
            onClick={() => {
              store.setState({ dataView: 'rain' });
            }}
          >
            Niederschläge
          </FilterLink>
          <FilterLink
            active={dataView === 'adopted'}
            onClick={() => {
              store.setState({ dataView: 'adopted' });
            }}
          >
            Bereits adoptiert
          </FilterLink>
          <FilterLink
            active={dataView === 'watered'}
            onClick={() => {
              store.setState({ dataView: 'watered' });
            }}
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

export default Cardlegend;
