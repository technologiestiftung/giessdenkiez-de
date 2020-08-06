/* eslint-disable @typescript-eslint/camelcase */
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { waterNeed, isTreeAdopted } from '../../utils/';
import Actions from '../../state/Actions';
import { useAuth0 } from '../../utils/auth/auth0';
import { connect } from 'unistore/react';
import store from '../../state/Store';

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
import { IsTreeAdoptedProps, Generic } from '../../common/interfaces';
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

// const controller = new AbortController();
// const { signal } = controller;

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

  const getTreeProp = (p: Generic | string | null) => {
    return p === 'null' ? null : p;
  };
  // type IsMountedType = { isMounted: boolean };
  type FetchDataOpts = Omit<IsTreeAdoptedProps, 'token'>;

  const fetchData: (opts: FetchDataOpts) => Promise<void> = async ({
    id,
    uuid,
    store,
    state,
    isAuthenticated,
    // isMounted,
  }) => {
    try {
      if (user && selectedTree) {
        const token = await getTokenSilently();
        await isTreeAdopted({
          id,
          uuid,
          token,
          isAuthenticated,
          store,
          state,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!user) return;
    // let isMounted = true;
    fetchData({
      // isMounted,
      id: selectedTree.id,
      uuid: user.user_id,
      store,
      state,
      isAuthenticated,
    }).catch(console.error);
  }, [user, selectedTree, treeAdopted]);

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
            <CardHeadline>{radolan_sum} Liter pro m²</CardHeadline>
          </FlexRowDiv>
          <CardDescription>in den letzten 30 Tagen</CardDescription>
          <Linechart data={radolan_days} sum={radolan_sum} />
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
