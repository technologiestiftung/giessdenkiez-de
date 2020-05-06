import React, { useEffect } from "react";
import styled from "styled-components";
import Store from "../../../state/Store";
import { connect } from "unistore/react";
import Actions from "../../../state/Actions";

import CardDescription from "../CardDescription/";
import CardDescriptionTitle from "../CardDescriptionTitle/";
import SidebarSearchAge from "../../Sidebar/SidebarSearch/SidebarSearchAge"

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${(p) => p.theme.colorGreyLight};
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
  font-size: ${(p) => p.theme.fontSizeL};
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

const UnstyledFlexWidth = styled(UnstyledFlex)`
  border-bottom: none;
  width: fit-content;
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 6px 9px;
  margin-bottom: 2px;
  cursor: pointer;
  border-radius: 100px;
  background: ${(p) => (p.active ? p.theme.colorTextMedium : "white")};
  transition: all .125s ease-in-out;

  &:hover {
    background: ${(p) => (p.active ? p.theme.colorGreyLight : p.theme.colorTextMedium)};
    transition: all .125s ease-in-out;
  }
`;

const Btn = styled.span`
  font-size: 0.8rem;
  margin-right: 10px;
  cursor: pointer;
  border: 1px solid ${p => p.theme.colorTextDark};
  background: ${p => p.active ? p.theme.colorTextDark : 'white'};
  color: ${p => p.active ? 'white' : p.theme.colorTextDark};
  padding: 10px;
  border-radius: 3px;
`;

const LegendDot = styled.div`
  width: 13px;
  height: 13px;
  border-radius: 100px;
  margin-right: 5px;
  background-color: ${(p) => p.color};
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
`;

const Cardlegend = (p) => {
  const { treesVisible, rainVisible, pumpsVisible, dataView } = p;

  return (
    <>
      <Flex>
        <StyledCardDescription>Datenansicht</StyledCardDescription>
        <StyledCardDescriptionSecond>
          Betrachte welche Bäume bereits von anderen Nutzern gegossen wurden. Oder finde heraus, wieviel Niederschlag die Bäume in den letzten 30 Tagen erreicht hat.
        </StyledCardDescriptionSecond>
        <UnstyledFlexWidth
          active={dataView == 'rain'}
          onClick={() => {

            Store.setState({ dataView: 'rain' });
          }}
        >
          <StyledItemLabel>Niederschläge</StyledItemLabel>
        </UnstyledFlexWidth>
        <UnstyledFlexWidth
          active={dataView == 'adopted'}
          onClick={() => {
            Store.setState({ dataView: 'adopted' });
          }}
        >
          <StyledItemLabel>Bereits abonniert</StyledItemLabel>
        </UnstyledFlexWidth>
        <UnstyledFlexWidth
          active={dataView == 'watered'}
          onClick={() => {
            Store.setState({ dataView: 'watered' });
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
    </>
  );
};

export default connect(
  (state) => ({
    treesVisible: state.treesVisible,
    rainVisible: state.rainVisible,
    pumpsVisible: state.pumpsVisible,
    dataView: state.dataView
  }),
  Actions
)(Cardlegend);
