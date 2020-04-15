import React from "react";
import styled from "styled-components";
import classnames from "classnames";
import { convertTime, waterNeed } from "../../utils/";
import Actions from "../../state/Actions";
import { connect } from "unistore/react";

import CardWrapper from "./CardWrapper/";
import CardProperty from "./CardProperty/";
import Linechart from "../Linechart/";
import CardAccordion from "./CardAccordion/";
import CardAccordionTitle from "./CardAccordion/CardAccordionTitle";
import TreeType from "./CardAccordion/TreeType";
import TreeWatering from "./CardAccordion/TreeWatering";
import ButtonWater from "../ButtonWater/";
import CardWaterDrops from "./CardWaterDrops";

import content from "../../assets/content";
const { sidebar } = content;
const { treetypes, watering } = sidebar;

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

const SublineSpan = styled.span`
  margin-bottom: 20px;
  text-transform: capitalize;
`;

const TreeTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0px;
  line-height: 125%;
  margin-bottom: 5px;
`;

const SublineSpanClose = styled.span`
  margin-bottom: 3px;
`;

const Card = (p) => {
  const { data, selectedTree, selectedTreeState } = p;

  const {
    watered,
    kroneDurch,
    baumHoehe,
    stammUmfg,
    standAlter,
    pflanzJahr,
    radolan_sum,
    artDtsch,
    radolan_days,
    gattungDeutsch,
    strName,
    hausNr,
    bezirk,
  } = data;

  let treeWatered = "";

  if (watered) {
    treeWatered = convertTime(watered);
  }

  if (!watered) {
    treeWatered = "Keine Informationen verfügbar.";
  }

  if (selectedTreeState === "ADOPT") {
    treeWatered = "Abonniere Baum ...";
  }

  if (selectedTreeState === "LOADING") {
    treeWatered = "Abonniere Baum ...";
  }

  if (selectedTreeState === "WATERING") {
    treeWatered = "Bewässerung eintragen ...";
  }

  const alter =
    standAlter !== null ? `${standAlter} Jahre alt` : "Keine Alter Vorhanden";

  const stateWaterTreeClass = classnames({
    noInfo: treeWatered == "Keine Informationen verfügbar.",
    watering:
      treeWatered == "Bewässerung eintragen ..." ||
      treeWatered == "Abonniere Baum ...",
    treeState: true,
  });

  const treeType = treetypes.find((treetype) => treetype.id === gattungDeutsch);

  return (
    <CardWrapper>
      <FlexColumnDiv>
        <TreeTitle>{artDtsch}</TreeTitle>
        {!treeType && <SublineSpan>{gattungDeutsch.toLowerCase()}</SublineSpan>}

        {treeType && (
          <CardAccordion
            title={<CardAccordionTitle>{treeType.title}</CardAccordionTitle>}
          >
            <TreeType>{treeType.description}</TreeType>
          </CardAccordion>
        )}

        <CardAccordion
          title={
            <CardAccordionTitle>
              {alter}
              {standAlter && (<CardWaterDrops data={waterNeed(parseInt(standAlter))}/>)} 
            </CardAccordionTitle>
          }
        >
          <TreeWatering data={watering} />
        </CardAccordion>

        {stateWaterTreeClass && (
          <span className={stateWaterTreeClass}>{treeWatered}</span>
        )}
        {strName && hausNr && (
          <SublineSpanClose>
            {strName}
            {hausNr}
          </SublineSpanClose>
        )}
        {bezirk && <SublineSpan>{bezirk}</SublineSpan>}
        {baumHoehe && <CardProperty name="Baumhöhe:" value={baumHoehe} />}
        {stammUmfg && <CardProperty name="Stammumfang:" value={stammUmfg} />}
        {kroneDurch && (
          <CardProperty name="Kronendurchmesser:" value={kroneDurch} />
        )}
        {pflanzJahr && standAlter && (
          <CardProperty
            name="Gepflanzt:"
            value={`${pflanzJahr} (${standAlter} Jahre)`}
          />
        )}
        <Linechart data={radolan_days} sum={radolan_sum}/>
        <ButtonWater />
      </FlexColumnDiv>
    </CardWrapper>
  );
};

export default connect(
  (state) => ({
    selectedTree: state.selectedTree,
    selectedTreeState: state.selectedTreeState,
  }),
  Actions
)(Card);
