import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWaterNeedByAge } from '../../utils/getWaterNeedByAge';
import { useStoreState } from '../../state/unistore-hooks';
import { useAuth0 } from '../../utils/auth/auth0';

import CardWrapper from './CardWrapper';
import CardProperty from './CardProperty';
import CardAccordion from './CardAccordion';
import CardHeadline from './CardHeadline';
import CardDescription from './CardDescription';
import CardAccordionTitle from './CardAccordion/CardAccordionTitle';
import TreeType from './CardAccordion/TreeType';
import TreeWatering from './CardAccordion/TreeWatering';
import TreeLastWatered from './CardAccordion/TreeLastWatered';
import ButtonWater from '../ButtonWater';
import CardWaterDrops from './CardWaterDrops';
import TreeButton from '../TreeButton';
import store from '../../state/Store';

import content from '../../assets/content';
import { Generic } from '../../common/interfaces';
import Icon from '../Icons';
import StackedBarChart from '../StackedBarChart';
import { isTreeAdopted } from '../../utils/requests/isTreeAdopted';
import { adoptTree } from '../../utils/requests/adoptTree';
import { getCommunityData } from '../../utils/requests/getCommunityData';
import { waterTree } from '../../utils/requests/waterTree';
import { getTreeData } from '../../utils/requests/getTreeData';
import { ButtonWaterGroup } from '../../common/types';
const { sidebar } = content;
const { treetypes, watering } = sidebar;

const FlexColumnDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const CaretakerDiv = styled.div`
  padding-bottom: 0.75rem;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  line-height: ${p =>
    parseFloat(p.theme.fontSizeM.replace('rem', '')) * 1.2}rem;
`;

const CaretakerSublineSpan = styled.span`
  font-size: ${p => p.theme.fontSizeM};
  margin-top: -${p => parseFloat(p.theme.fontSizeM.replace('rem', '')) / 2 + 0.1}rem;
  margin-left: -${p => p.theme.fontSizeM};
`;
const SublineSpan = styled.span`
  margin-bottom: 0.75rem;
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

const getTreeProp = (p: Generic | string | null) => {
  return p === 'null' || p === undefined ? null : p;
};

const Card: FC = () => {
  const [token, setToken] = useState<string | undefined>(undefined);
  const selectedTreeId = useStoreState('selectedTreeId');
  const selectedTreeData = useStoreState('selectedTreeData');
  const userdata = useStoreState('user');
  const [isSelectedTreeAdopted, setIsSelectedTreeAdopted] = useState<
    boolean | undefined
  >(undefined);

  const { getTokenSilently, isAuthenticated, user } = useAuth0();

  const { standalter, artdtsch, gattungdeutsch, caretaker, wateredDays } =
    selectedTreeData || {};

  useEffect(() => {
    if (getTokenSilently === undefined) return;

    console.log(user);
    getTokenSilently()
      .then((token: string) => {
        setToken(token);
        return;
      })
      .catch(console.error);
  }, [getTokenSilently]);
  useEffect(() => {
    if (!user || !selectedTreeId) return;
    if (!user.sub) return;
    getTokenSilently()
      .then((token: string) =>
        isTreeAdopted({
          id: selectedTreeId,
          uuid: user.sub as string,
          token,
          isAuthenticated,
        })
      )
      .catch(console.error);
  }, [user, selectedTreeId, treeAdopted]);

  const treeType = treetypes.find(treetype => treetype.id === gattungdeutsch);

  return (
    <CardWrapper>
      <FlexColumnDiv>
        <TreeTitle>{artdtsch}</TreeTitle>
        {!treeType &&
          treeType !== 'undefined' &&
          gattungdeutsch !== null &&
          gattungdeutsch !== 'undefined' &&
          gattungdeutsch !== undefined && (
            <SublineSpan>
              {getTreeProp(gattungdeutsch.toLowerCase())}
            </SublineSpan>
          )}
        {caretaker && caretaker.length > 0 && (
          <CaretakerDiv>
            <Icon iconType='water' height={32}></Icon>
            <CaretakerSublineSpan>{`Dieser Baum wird regelmäßig vom ${caretaker} gewässert.`}</CaretakerSublineSpan>
          </CaretakerDiv>
        )}
        {treeAdopted && selectedTreeData && (
          <TreeButton tree={selectedTreeData} label='Adoptiert' />
        )}
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
                  <CardWaterDrops
                    data={getWaterNeedByAge(parseInt(standalter)) || []}
                  />
                )}
              </CardAccordionTitle>
            }
          >
            <TreeWatering data={watering} />
          </CardAccordion>
        )}
        <RainContainer>
          <CardHeadline>Wassermenge</CardHeadline>
          <CardDescription>der letzten 30 Tage</CardDescription>
          <StackedBarChart />
        </RainContainer>
        {Array.isArray(wateredDays) && wateredDays.length > 0 && (
          <CardAccordion
            active={true}
            title={<CardAccordionTitle>Zuletzt gegossen</CardAccordionTitle>}
          >
            <TreeLastWatered data={wateredDays} />
          </CardAccordion>
        )}
        <ButtonWater
          // user={user}
          waterGroup={waterGroup}
          isEmailVerified
          isAuthenticated={isAuthenticated}
          setWaterGroup={setWaterGroup}
          adoptTreeClickHandler={async () => {
            if (!selectedTreeId) return;
            if (!user) return;
            if (!user.sub) return;
            if (!token) return;
            store.setState({ selectedTreeState: 'ADOPT' });
            // const token = await getTokenSilently();
            await adoptTree(selectedTreeId, token, user.sub);
            store.setState({
              selectedTreeState: 'ADOPTED',
            });
            const communityData = await getCommunityData();
            store.setState(communityData);
          }}
          waterTreeClickHandler={async (treeId, amount) => {
            console.log(`water tree ${treeId} with amount: ${amount}`);
            if (!userdata) return;
            if (!user) return;
            if (!user.sub) return;
            if (!token) return;
            setWaterGroup('watered');
            // const token = await getTokenSilently();
            await waterTree({
              id: treeId,
              amount,
              username: userdata.username,
              userId: user.sub,
              token,
            });

            const treeData = await getTreeData(treeId);
            store.setState(treeData);
            setWaterGroup('visible');
          }}
        />
      </FlexColumnDiv>
    </CardWrapper>
  );
};

export default Card;
