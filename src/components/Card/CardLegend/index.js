import React, { useEffect } from "react";
import styled from "styled-components";
import Store from "../../../state/Store";
import { connect } from "unistore/react";
import Actions from "../../../state/Actions";

import CardDescription from "../CardDescription/";
import CardDescriptionTitle from "../CardDescriptionTitle/";
import SidebarSearchAge from "../../Sidebar/SidebarSearch/SidebarSearchAge"

const StyledCardDescription = styled(CardDescription)`
  font-weight: bold;
  font-size: 1rem;
  opacity: 1;
`;

const StyledCardDescriptionSecond = styled(CardDescription)`
  padding-top: 5px;
  margin-bottom: 15px;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
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

const ItemLabel = styled.label`
  font-size: ${(p) => p.theme.fontSizeL};
  opacity: 0.66;
  margin-right: 15px;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 20px;
  align-items: center;
`;

const Cardlegend = (p) => {
  const { treesVisible, rainVisible, pumpsVisible } = p;

  return (
    <>
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
    pumpsVisible: state.pumpsVisible
  }),
  Actions
)(Cardlegend);
