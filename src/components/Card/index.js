import React, { useEffect } from 'react';
import styled from 'styled-components';
import { waterNeed } from '../../utils/';
import Actions from '../../state/Actions';
import { useAuth0 } from '../../utils/auth0';
import { connect } from 'unistore/react';
import { fetchAPI, createAPIUrl } from '../../utils';
import Store from '../../state/Store';

import CardWrapper from './CardWrapper/';
import CardProperty from './CardProperty/';
import Linechart from '../Linechart/';
import CardAccordion from './CardAccordion/';
import CardHeadline from './CardHeadline/';
import CardDescription from './CardDescription/';
import CardAccordionTitle from './CardAccordion/CardAccordionTitle';
import TreeType from './CardAccordion/TreeType';
import TreeWatering from './CardAccordion/TreeWatering';
import TreeLastWatered from './CardAccordion/TreeLastWatered';
import ButtonWater from '../ButtonWater/';
import CardWaterDrops from './CardWaterDrops';
import ButtonAdopted from '../ButtonAdopted';

import content from '../../assets/content';
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
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
`;

const TreeTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0px;
  line-height: 125%;
  margin-bottom: 5px;
`;

// const FlexRow = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
// `;

const Card = p => {
  const { data, treeLastWatered, treeAdopted, user, selectedTree, state } = p;
  const { getTokenSilently, isAuthenticated } = useAuth0();

  const {
    standalter,
    radolan_sum,
    artdtsch,
    radolan_days,
    gattungdeutsch,
  } = data;

  /**
   * Apparently DWD 1 is not 1ml but 0.1ml
   * We could change this in the database, but this would mean,
   * transferring 625.000 "," characters, therefore,
   * changing it client-side makes more sense.
   */
  const adjusted_radolan_sum = radolan_sum / 10;
  const getTreeProp = p => {
    return p === 'null' ? null : p;
  };

  useEffect(() => {
    if (!user) return;
    if (user && selectedTree) {
      isTreeAdopted(selectedTree.id, user.user_id);
    }
  }, [user]);

  const isTreeAdopted = async (treeid, uuid) => {
    if (isAuthenticated) {
      const token = await getTokenSilently();
      try {
        const url = createAPIUrl(
          state,
          `/private/get-is-tree-adopted?uuid=${uuid}&treeid=${treeid}`
        );
        const r = await fetchAPI(url, {
          headers: { Authorization: 'Bearer ' + token },
        });
        Store.setState({ treeAdopted: r.data });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const treeType = treetypes.find(treetype => treetype.id === gattungdeutsch);

  return (
    <CardWrapper>
      <FlexColumnDiv>
        <TreeTitle>{artdtsch}</TreeTitle>
        {!treeType && treeType !== 'undefined' && (
          <SublineSpan>{getTreeProp(gattungdeutsch.toLowerCase())}</SublineSpan>
        )}
        {treeAdopted && <ButtonAdopted />}

        {treeType && treeType.title !== null && (
          <CardAccordion
            title={
              <CardAccordionTitle>
                {getTreeProp(treeType.title)}
              </CardAccordionTitle>
            }
          >
            <TreeType>{treeType.description}</TreeType>
          </CardAccordion>
        )}

        {standalter && standalter !== 'undefined' && (
          <CardProperty name='Standalter' value={standalter + ' Jahre'} />
        )}

        {standalter !== 'null' && standalter !== 'undefined' && (
          <CardAccordion
            title={
              <CardAccordionTitle>
                Wasserbedarf:
                {standalter && (
                  <CardWaterDrops data={waterNeed(parseInt(standalter))} />
                )}
              </CardAccordionTitle>
            }
          >
            <TreeWatering data={watering} />
          </CardAccordion>
        )}

        <RainContainer>
          <FlexRowDiv>
            <CardHeadline>Niederschlag</CardHeadline>
            <CardHeadline>{adjusted_radolan_sum} Liter pro m²</CardHeadline>
          </FlexRowDiv>
          <CardDescription>in den letzten 30 Tagen</CardDescription>
          <Linechart data={radolan_days} sum={adjusted_radolan_sum} />
          {/* <CardDescription>Eine Niederschlagshöhe von  {radolan_sum} mm entspricht einer Niederschlagsmenge von {radolan_sum} l/m².</CardDescription> */}
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
  state => ({
    selectedTree: state.selectedTree,
    treeLastWatered: state.treeLastWatered,
    selectedTreeState: state.selectedTreeState,
    treeAdopted: state.treeAdopted,
    user: state.user,
    state: state,
  }),
  Actions
)(Card);
