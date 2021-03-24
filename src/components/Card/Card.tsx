import React, { FC } from 'react';
import styled from 'styled-components';
import { getWaterNeedByAge } from '../../utils/getWaterNeedByAge';

import CardWrapper from './CardWrapper';
import CardProperty from './CardProperty';
import ExpandablePanel from '../ExpandablePanel';
import WaterNeedsInfo from '../WaterNeedsInfo';
import UsersWateringsList from '../UsersWateringsList';
import ButtonWater from '../ButtonWater';
import WaterDrops from '../WaterDrops';
import Login from '../Login';

import content from '../../assets/content';
import { SelectedTreeType } from '../../common/interfaces';
import Icon from '../Icons';
import StackedBarChart from '../StackedBarChart';
import { useUserState } from '../../utils/hooks/useUserState';
import { ParticipateButton } from '../ParticipateButton';
import Paragraph from '../Paragraph';
import { NonVerfiedMailMessage } from './non-verified-mail';
import ButtonRound from '../ButtonRound';
import SmallParagraph from '../SmallParagraph';

const { treetypes } = content.sidebar;

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

const TreeTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0px;
  line-height: 125%;
  margin-bottom: 5px;
`;

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
  // const treeType = treetypes[0];

  const treeIsAdopted =
    userData && userData.adoptedTrees.find(({ id }) => id === treeId);

  return (
    <CardWrapper>
      <FlexColumnDiv>
        {(artdtsch || gattungdeutsch || treeType?.title) && (
          <TreeTitle>{artdtsch || gattungdeutsch || treeType?.title}</TreeTitle>
        )}
        {!treeType &&
          gattungdeutsch &&
          gattungdeutsch !== 'undefined' &&
          gattungdeutsch.toLowerCase() !== artdtsch?.toLowerCase() && (
            <SublineSpan>{gattungdeutsch.toLowerCase()}</SublineSpan>
          )}
        {caretaker && caretaker.length > 0 && (
          <CaretakerDiv>
            <Icon iconType='water' height={32}></Icon>
            <CaretakerSublineSpan>{`Dieser Baum wird regelmäßig vom ${caretaker} gewässert.`}</CaretakerSublineSpan>
          </CaretakerDiv>
        )}
        {treeType && treeType.title && (
          <ExpandablePanel title={treeType.title}>
            {treeType.description}
          </ExpandablePanel>
        )}
        {standalter && standalter !== 'undefined' && (
          <>
            <CardProperty name='Standalter' value={standalter + ' Jahre'} />
            <ExpandablePanel
              title={
                <>
                  <span style={{ marginRight: 8 }}>Wasserbedarf:</span>
                  <WaterDrops
                    dropsAmount={getWaterNeedByAge(parseInt(standalter))}
                  />
                </>
              }
            >
              <WaterNeedsInfo />
            </ExpandablePanel>
          </>
        )}
        <ExpandablePanel
          title={
            <>
              <div>Wassermenge</div>
              <SmallParagraph>der letzten 30 Tage</SmallParagraph>
            </>
          }
          isExpanded
        >
          <StackedBarChart selectedTreeData={selectedTreeData} />
        </ExpandablePanel>
        {Array.isArray(waterings) && waterings.length > 0 && (
          <ExpandablePanel isExpanded={true} title='Zuletzt gegossen'>
            <UsersWateringsList waterings={waterings} />
          </ExpandablePanel>
        )}

        <br />
        {!userData && (
          <div>
            <Login />
            <ParticipateButton />
          </div>
        )}

        {userData && !userData.isVerified && (
          <>
            <Paragraph>
              Bäume adoptieren und wässern ist nur möglich mit verifiziertem
              Account.
            </Paragraph>
            <NonVerfiedMailMessage />
          </>
        )}

        {userData && userData.isVerified && (
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
