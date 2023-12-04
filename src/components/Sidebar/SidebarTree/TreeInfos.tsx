import React, { FC, useMemo } from 'react';
import styled from 'styled-components';
import { getWaterNeedByAge } from '../../../utils/getWaterNeedByAge';

import ExpandablePanel from '../../ExpandablePanel';
import WaterNeedsInfo from '../../WaterNeedsInfo';
import UsersWateringsList from '../../UsersWateringsList';
import ButtonWater from '../../ButtonWater';
import WaterDrops from '../../WaterDrops';
import Login from '../../Login';

import content from '../../../assets/content';
import { SelectedTreeType } from '../../../common/interfaces';
import Icon from '../../Icons';
import StackedBarChart from '../../StackedBarChart';
import { useUserData } from '../../../utils/hooks/useUserData';
import { ParticipateButton } from '../../ParticipateButton';
import Paragraph from '../../Paragraph';
import { NonVerfiedMailMessage } from '../../NonVerfiedMailMessage';
import ButtonRound from '../../ButtonRound';
import SmallParagraph from '../../SmallParagraph';
import { useAdoptingActions } from '../../../utils/hooks/useAdoptingActions';
import { useCommunityData } from '../../../utils/hooks/useCommunityData';
import { rainCircle, wateredCircle } from '../../StackedBarChart/TooltipLegend';

const { treetypes } = content.sidebar;

const Wrapper = styled.div`
  z-index: 3;
  margin: 0 0 20px;
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

const TreeTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  margin-top: 0px;
  line-height: 125%;
  margin-bottom: 5px;
`;

const AgeInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding: 12px 0;
  font-weight: bold;
`;

const AgeInfoValue = styled.span`
  font-weight: normal;
`;

const AdoptedIndication = styled.span<{
  selfAdopted?: boolean;
}>`
  display: inline-block;
  border-radius: 2px;
  font-size: ${p => p.theme.fontSizeM};
  line-height: ${p => p.theme.fontSizeM};
  color: ${p =>
    p.selfAdopted ? p.theme.colorPrimary : p.theme.colorSecondary};
  border: 1px solid;
  padding: 4px 5px;
  font-weight: normal;
  transform: translateY(-4px);
`;

const AdoptionsParent = styled.div`
  display: flex;
  column-gap: 8px;
  row-gap: 4px;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const ActionsWrapper = styled.div`
  padding-top: ${p => p.theme.spacingM};
`;

const BaselineGrid = styled.span`
  display: inline-grid;
  grid-auto-flow: column;
  align-items: baseline;
  column-gap: 4px;
`;

const TreeInfos: FC<{
  selectedTreeData: SelectedTreeType;
}> = ({ selectedTreeData }) => {
  const {
    id: treeId,
    pflanzjahr,
    artdtsch,
    gattungdeutsch,
    caretaker,
    waterings,
  } = selectedTreeData;

  const { userData } = useUserData();
  const {
    unadoptTree,
    adoptTree,
    isBeingAdopted,
    isBeingUnadopted,
  } = useAdoptingActions(treeId);
  const { data: communityData } = useCommunityData();

  const treeType = treetypes.find(treetype => treetype.id === gattungdeutsch);

  const adoptedByLoggedInUser =
    userData && userData.adoptedTrees.find(({ id }) => id === treeId);

  const adoptionsMap = communityData?.adoptedTreesIds || {};
  const numAdoptionsByOtherUsers = adoptionsMap[treeId] || 0;
  const adoptedByOtherUsers =
    (adoptedByLoggedInUser
      ? numAdoptionsByOtherUsers - 1
      : numAdoptionsByOtherUsers) > 0;

  const treeAge =
    pflanzjahr && pflanzjahr !== 'undefined' && pflanzjahr !== 'NaN'
      ? new Date().getFullYear() - parseInt(pflanzjahr, 10)
      : undefined;

  const currentDate = new Date();
  const todayAt3pm = new Date(new Date().setHours(15));
  /*
    We force the bar chart date to be 15:00 today, so that the new timestamped waterings (which are all at 15:00) will be displayed immediately. After 15:00 we can use the current time again.
  */
  const barChartDate = currentDate < todayAt3pm ? todayAt3pm : currentDate;

  const wateringsSum = useMemo(() => {
    if (!waterings) return 0;
    const last30DaysWaterings = waterings.filter(w => {
      const msPerDay = 86400000;
      const elapsedMs = new Date().getTime() - Date.parse(w.timestamp);
      return elapsedMs / msPerDay <= 30;
    });
    return last30DaysWaterings.reduce(
      (sum, current) => sum + current.amount,
      0
    );
  }, [waterings]);

  const rainSum = useMemo(() => {
    // reverse because last element is most recent rain
    const last30Days = [...selectedTreeData.radolan_days]
      .reverse()
      .slice(-(30 * 24));
    return last30Days.reduce((sum, current) => sum + current, 0);
  }, [selectedTreeData.radolan_days]);

  return (
    <Wrapper>
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
        {(adoptedByLoggedInUser || adoptedByOtherUsers) && (
          <AdoptionsParent>
            {adoptedByLoggedInUser && (
              <AdoptedIndication selfAdopted>
                Von mir adoptiert ✔
              </AdoptedIndication>
            )}
            {adoptedByOtherUsers && (
              <AdoptedIndication>
                {adoptedByLoggedInUser
                  ? `Ebenfalls von anderen adoptiert`
                  : `Von anderen Nutzer:innen adoptiert`}{' '}
                ✔
              </AdoptedIndication>
            )}
          </AdoptionsParent>
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
        {treeAge && (
          <>
            <AgeInfoContainer>
              <span>Standalter</span>
              <AgeInfoValue>{treeAge} Jahre</AgeInfoValue>
            </AgeInfoContainer>
            <ExpandablePanel
              title={
                <>
                  <span style={{ marginRight: 8 }}>Wasserbedarf:</span>
                  <WaterDrops dropsAmount={getWaterNeedByAge(treeAge)} />
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
              <div>
                <BaselineGrid>
                  <span>{wateredCircle}</span>
                  <SmallParagraph>
                    Gießungen: {wateringsSum.toFixed(1)}l
                  </SmallParagraph>
                </BaselineGrid>
              </div>
              <div>
                <BaselineGrid>
                  <span>{rainCircle}</span>
                  <SmallParagraph>Regen: {rainSum.toFixed(1)}l</SmallParagraph>
                </BaselineGrid>
              </div>
            </>
          }
          isExpanded
        >
          <StackedBarChart
            selectedTreeData={selectedTreeData}
            // We set the date here to 15:00 because all waterings from now on will have a timestamp of 15:00.
            date={barChartDate}
          />
        </ExpandablePanel>
        {Array.isArray(waterings) && waterings.length > 0 && (
          <ExpandablePanel
            isExpanded={true}
            title={
              <>
                Letzte Bewässerungen
                <SmallParagraph>Neueste zuerst</SmallParagraph>
              </>
            }
          >
            <UsersWateringsList
              waterings={waterings}
              treeId={selectedTreeData.id}
            />
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
          <ActionsWrapper>
            <ButtonWater />
            <ButtonRound
              margin='15px 0'
              onClick={() =>
                adoptedByLoggedInUser ? unadoptTree() : adoptTree()
              }
              type='secondary'
            >
              {adoptedByLoggedInUser &&
                !isBeingUnadopted &&
                'Adoption aufheben'}
              {adoptedByLoggedInUser &&
                isBeingUnadopted &&
                'Adoption wird aufgehoben'}
              {!adoptedByLoggedInUser && !isBeingAdopted && 'Baum adoptieren'}
              {!adoptedByLoggedInUser &&
                isBeingAdopted &&
                'Baum wird adoptiert'}
            </ButtonRound>
            <ParticipateButton />
          </ActionsWrapper>
        )}
      </FlexColumnDiv>
    </Wrapper>
  );
};

export default TreeInfos;
