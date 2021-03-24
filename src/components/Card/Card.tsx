import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getWaterNeedByAge } from '../../utils/getWaterNeedByAge';

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
import { Generic, SelectedTreeType } from '../../common/interfaces';
import Icon from '../Icons';
import StackedBarChart from '../StackedBarChart';
import { isTreeAdopted } from '../../utils/requests/isTreeAdopted';
import { adoptTree } from '../../utils/requests/adoptTree';
import { getCommunityData } from '../../utils/requests/getCommunityData';
import { waterTree } from '../../utils/requests/waterTree';
import { ButtonWaterGroup } from '../../common/types';
import { getTreesAdoptedByUser } from '../../utils/requests/getTreesAdoptedByUser';
import { unadoptTree } from '../../utils/requests/unadoptTree';
import { useTreeData } from '../../utils/hooks/useTreeData';
import { useStoreState } from '../../state/unistore-hooks';
import { useAuth0 } from '../../utils/auth/auth0';

const { sidebar } = content;
const { treetypes, watering } = sidebar;

const TreeButtonWrapper = styled.div`
  display: flex;
  gap: 8px;
`;

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

const Card: FC<{
  selectedTreeData: SelectedTreeType;
}> = ({ selectedTreeData }) => {
  const {
    standalter,
    artdtsch,
    gattungdeutsch,
    caretaker,
    wateredDays,
    isAdopted,
  } = selectedTreeData;
  // const treeId = useStoreState('treeId');
  // const selectedTreeData = useStoreState('selectedTreeData');
  // const selectedTreeState = useStoreState('selectedTreeState');
  const userdata = useStoreState('userData');
  const { treeId } = useTreeData();

  const [waterGroup, setWaterGroup] = useState<ButtonWaterGroup>('visible');
  const [_, setUnadopting] = useState<string | undefined>(undefined);

  const { getTokenSilently, isAuthenticated, user } = useAuth0();
  // const token = useGetTokenSilently();

  const adoptTreeClick = async () => {
    if (!user) return;
    if (!user.sub) return;
    if (!treeId) return;
    if (typeof getTokenSilently !== 'function') return;

    const token = await getTokenSilently();
    await adoptTree(treeId, token, user.sub);
    const communityData = await getCommunityData();
    store.setState(communityData);
  };

  const waterTreeClick = async (treeId: string, amount: number) => {
    if (!user) return;
    if (!user.sub) return;
    if (!userdata) return;
    if (typeof getTokenSilently !== 'function') return;

    setWaterGroup('watered');
    const token = await getTokenSilently();
    await waterTree({
      id: treeId,
      amount,
      username: userdata.username,
      userId: user.sub,
      token,
    });

    // const treeData = await getTreeData(treeId);
    // store.setState(treeData);
    setWaterGroup('visible');
  };

  const unadoptTreeClickHandler = () => {
    setUnadopting(treeId);

    if (!user) return;
    if (!user.sub) return;
    if (!treeId) return;
    if (typeof getTokenSilently !== 'function') return;

    let localToken = '';

    getTokenSilently()
      .then(token => {
        localToken = token;
        return unadoptTree(treeId, user.sub as string, token);
      })
      .then(() =>
        getTreesAdoptedByUser({
          userId: user.sub as string,
          token: localToken,
        })
      )
      .then(adoptedTrees => {
        store.setState({
          adoptedTrees,
        });
        return;
      })
      .catch(console.error);
    setUnadopting(undefined);
  };
  useEffect(() => {
    if (typeof getTokenSilently !== 'function') return;
    if (!treeId) return;
    if (!user) return;
    if (!user.sub) return;
    /**
     * I would love to remove the call to getTokenSilently here, but
     * then the isTreeAdopted does not get triggerd from the effect.
     * @vogelino any idea why?
     *
     */
    getTokenSilently()
      .then((token: string) => {
        return isTreeAdopted({
          id: treeId,
          uuid: user.sub as string,
          token,
          isAuthenticated,
        });
      })
      .catch(console.error);
  }, [user, treeId, getTokenSilently, isAuthenticated]);

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
        {
          <TreeButtonWrapper>
            {isAdopted && (
              <TreeButton
                label='Freigeben'
                onClickHandler={unadoptTreeClickHandler}
              />
            )}
          </TreeButtonWrapper>
        }

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
        {standalter && (
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
          <StackedBarChart selectedTreeData={selectedTreeData} />
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
          waterGroup={waterGroup}
          isEmailVerified
          isAuthenticated={isAuthenticated}
          setWaterGroup={setWaterGroup}
          onAdoptTreeClick={adoptTreeClick}
          onWaterTreeClick={waterTreeClick}
        />
      </FlexColumnDiv>
    </CardWrapper>
  );
};

export default Card;
