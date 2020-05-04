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
import CardHeadline from "./CardHeadline/";
import CardDescription from "./CardDescription/";
import CardAccordionTitle from "./CardAccordion/CardAccordionTitle";
import TreeType from "./CardAccordion/TreeType";
import TreeWatering from "./CardAccordion/TreeWatering";
import TreeLastWatered from "./CardAccordion/TreeLastWatered";
import ButtonWater from "../ButtonWater/";
import CardWaterDrops from "./CardWaterDrops";

import content from "../../assets/content";
const { sidebar } = content;
const { treetypes, watering } = sidebar;

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FlexRowDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SublineSpan = styled.span`
  margin-bottom: 20px;
  text-transform: capitalize;
`;

const RainContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${p => p.theme.spacingM};
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
  const { data, selectedTree, selectedTreeState, treeLastWatered } = p;

  const {
    watered,
    kronedurch,
    baumhoehe,
    stammumfg,
    standalter,
    pflanzjahr,
    radolan_sum,
    artdtsch,
    radolan_days,
    gattungdeutsch,
    strname,
    hausnr,
    bezirk,
  } = data;

  const getTreeProp = p => {
    return p === 'null' ? null : p;
  }

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
    standalter !== null ? `${standalter} Jahre alt` : "Keine Alter Vorhanden";

  const stateWaterTreeClass = classnames({
    noInfo: treeWatered == "Keine Informationen verfügbar.",
    watering:
      treeWatered == "Bewässerung eintragen ..." ||
      treeWatered == "Abonniere Baum ...",
    treeState: true,
  });

  const treeType = treetypes.find((treetype) => treetype.id === gattungdeutsch);

  return (
    <CardWrapper>
      <FlexColumnDiv>
        <TreeTitle>{artdtsch}</TreeTitle>
        {!treeType && treeType !== 'undefined' && <SublineSpan>{getTreeProp(gattungdeutsch.toLowerCase())}</SublineSpan>}

        {treeType && (treeType.title !== null) && (
          <CardAccordion
            title={<CardAccordionTitle>{getTreeProp(treeType.title)}</CardAccordionTitle>}
          >
            <TreeType>{treeType.description}</TreeType>
          </CardAccordion>
        )}

        {(standalter !== 'null' && standalter != 'undefined') && (<CardAccordion
          title={
            <CardAccordionTitle>
              {alter}
              {standalter && (<CardWaterDrops data={waterNeed(parseInt(standalter))}/>)} 
            </CardAccordionTitle>
          }
        >
          <TreeWatering data={watering} />
        </CardAccordion>)}

        {/* {stateWaterTreeClass && (
          <span className={stateWaterTreeClass}>{treeWatered}</span>
        )} */}
        {/* {strname && hausnr && (
          <SublineSpanClose>
            {strname}
            {hausnr}
          </SublineSpanClose>
        )} */}
        {/* {bezirk && <SublineSpan>{bezirk}</SublineSpan>}
        {baumhoehe && <CardProperty name="Baumhöhe:" value={baumhoehe} />}
        {stammumfg && <CardProperty name="Stammumfang:" value={stammumfg} />}
        {kronedurch && (
          <CardProperty name="Kronendurchmesser:" value={kronedurch} />
        )} */}

        {/* {pflanzjahr && standalter && (
          <CardProperty
            name="Gepflanzt:"
            value={`${pflanzjahr} (${standalter} Jahre)`}
          />
        )} */}

        <RainContainer>
          <FlexRowDiv>
            <CardHeadline>Niederschlag</CardHeadline>
            <CardHeadline>{radolan_sum} mm</CardHeadline>
          </FlexRowDiv>
          <CardDescription>in den letzten 30 Tagen</CardDescription>
          <Linechart data={radolan_days} sum={radolan_sum}/>
          <CardDescription>Eine Niederschlagshöhe von  {radolan_sum} mm entspricht einer Niederschlagsmenge von {radolan_sum} l/m².</CardDescription>
        </RainContainer>

        {treeLastWatered.length > 0 && (
          <CardAccordion
            active={true}
            title={<CardAccordionTitle>Zuletzt gegossen</CardAccordionTitle>}
          >
            <TreeLastWatered data={treeLastWatered} />
          </CardAccordion>
        )}

        <ButtonWater />
      </FlexColumnDiv>
    </CardWrapper>
  );
};

export default connect(
  (state) => ({
    selectedTree: state.selectedTree,
    treeLastWatered: state.treeLastWatered,
    selectedTreeState: state.selectedTreeState,
  }),
  Actions
)(Card);
