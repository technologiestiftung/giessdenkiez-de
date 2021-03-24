import React, { FC } from 'react';
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
import Login from '../Login';

import content from '../../assets/content';
import { Generic, SelectedTreeType } from '../../common/interfaces';
import Icon from '../Icons';
import StackedBarChart from '../StackedBarChart';
import { useUserState } from '../../utils/hooks/useUserState';
import { ParticipateButton } from '../ParticipateButton';
import CardParagraph from './CardParagraph';
import { NonVerfiedMailCardParagraph } from './non-verified-mail';
import ButtonRound from '../ButtonRound';

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

const Card: FC<{
  selectedTreeData: SelectedTreeType;
}> = ({ selectedTreeData }) => {
  const {
    id: treeId,
    standalter,
    artdtsch,
    gattungdeutsch,
    caretaker,
    waterings,
  } = selectedTreeData;

  const { userData, unadoptTree, adoptTree, waterTree } = useUserState();

  const treeType = treetypes.find(treetype => treetype.id === gattungdeutsch);

  const treeIsAdopted =
    userData && userData.adoptedTrees.find(({ id }) => id === treeId);

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
        {Array.isArray(waterings) && waterings.length > 0 && (
          <CardAccordion
            active={true}
            title={<CardAccordionTitle>Zuletzt gegossen</CardAccordionTitle>}
          >
            <TreeLastWatered waterings={waterings} />
          </CardAccordion>
        )}
        {!userData && (
          <div>
            <Login />
            <ParticipateButton />
          </div>
        )}

        {userData && !userData.isVerified && (
          <>
            <CardParagraph>
              Bäume adoptieren und wässern ist nur möglich mit verifiziertem
              Account.
            </CardParagraph>
            <NonVerfiedMailCardParagraph />
          </>
        )}

        {treeId && userData && userData.isVerified && (
          <>
            <ButtonRound
              margin='15px'
              onClick={() =>
                treeIsAdopted ? unadoptTree(treeId) : adoptTree(treeId)
              }
              type='secondary'
            >
              {treeIsAdopted ? 'Baum unadoptieren' : 'Baum adoptieren'}
            </ButtonRound>
            <ButtonWater
              onClick={(amount: number) => waterTree(treeId, amount)}
            />
          </>
        )}
      </FlexColumnDiv>
    </CardWrapper>
  );
};

export default Card;
