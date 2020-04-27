import React, { useEffect } from "react";
import styled from "styled-components";
import { interpolateColor } from "../../../utils/";
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
  border: 1px solid ${p => p.theme.colorPrimary};
  background: ${p => p.active ? p.theme.colorPrimary : 'white'};
  color: ${p => p.active ? 'white' : p.theme.colorPrimary};
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
  const legendArray = [
    {
      label: "< 10",
      value: 10,
    },
    {
      label: "< 20",
      value: 20,
    },
    {
      label: "< 30",
      value: 30,
    },
    {
      label: "< 40",
      value: 40,
    },
    {
      label: "< 50",
      value: 50,
    },
    {
      label: "< 60",
      value: 60,
    },
    {
      label: "< 70",
      value: 70,
    },
    {
      label: "< 80",
      value: 80,
    },
    {
      label: "< 90",
      value: 90,
    },
    {
      label: "100",
      value: 100,
    },
  ];

  useEffect(() => {
    console.log(interpolateColor(50), "interpolate");
  }, []);

  return (
    <>
        <Flex>
          <StyledCardDescription>Sichtbare Daten</StyledCardDescription>
          <StyledCardDescriptionSecond>
            Schalte die Datensätze ein, die Dich interessieren.
          </StyledCardDescriptionSecond>
          <Btn
            className="btn"
            active={rainVisible}
            onClick={() => {
              Store.setState({ rainVisible: !rainVisible });
            }}
          >
            Niederschlag
          </Btn>
          <StyledCardDescriptionSecond>
            Zeigt die Niederschlagmenge der letzten 30 Tage in Liter.
          </StyledCardDescriptionSecond>
          <Btn
            className="btn"
            active={treesVisible}
            onClick={() => {
              Store.setState({ treesVisible: !treesVisible });
            }}
          >
            Bäume
          </Btn>
          <StyledCardDescriptionSecond>
            Erkunde die Geschichte von Berlins Baumlandschaft
          </StyledCardDescriptionSecond>
          <Btn
            className="btn"
            active={pumpsVisible}
            onClick={() => {
              Store.setState({ pumpsVisible: !pumpsVisible });
            }}
          >
            Wasserpumpen
          </Btn>
          <StyledCardDescriptionSecond>
            Erkunde die Geschichte von Berlins Baumlandschaft
          </StyledCardDescriptionSecond>
        </Flex>
        <Flex>
          <StyledCardDescription>Baumalter</StyledCardDescription>
          <StyledCardDescriptionSecond>
            Erkunde die Geschichte von Berlins Baumlandschaft
          </StyledCardDescriptionSecond>
          <SidebarSearchAge />
        </Flex>
        {/* <Flex>
          <StyledCardDescription>Erhaltene Wassermenge</StyledCardDescription>
          <StyledCardDescriptionSecond>
            der letzten 30 Tage aus Regen & Gießungen
          </StyledCardDescriptionSecond>
          {legendArray.map((item) => (
            <>
              <ItemContainer>
                <LegendDot color={interpolateColor(item.value)} />
                <ItemLabel>{item.label}</ItemLabel>
              </ItemContainer>
            </>
          ))}
        </Flex> */}
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
