import React, { FC, useState } from 'react';
import styled from 'styled-components';
import ShareIcon from '@material-ui/icons/Share';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import copy from "copy-to-clipboard"; 

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
  button {
    padding-bottom: 15px;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${p => p.theme.colorGreyLight};
  padding: 12px 0;
  font-weight: bold;
`;

const InfoValue = styled.span`
  font-weight: normal;
`;

const AdoptedIndication = styled.span`
  display: inline-block;
  margin-left: 8px;
  border-radius: 2px;
  font-size: ${p => p.theme.fontSizeM};
  line-height: ${p => p.theme.fontSizeM};
  color: ${p => p.theme.colorPrimary};
  border: 1px solid;
  padding: 4px 5px;
  font-weight: normal;
  transform: translateY(-4px);
`;

const TreeInfos: FC<{
  selectedTreeData: SelectedTreeType;
}> = ({ selectedTreeData }) => {
  const {
    id: treeId,
    pflanzjahr,
    artbot,
    artdtsch,
    gattung,
    gattungdeutsch,
    caretaker,
    waterings,
  } = selectedTreeData;

  const [open, setOpen] = useState(false);

  const { userData } = useUserData();
  const {
    unadoptTree,
    adoptTree,
    isBeingAdopted,
    isBeingUnadopted,
  } = useAdoptingActions(treeId);

  const treeType = treetypes.find(treetype => treetype.id === gattungdeutsch);

  const treeIsAdopted =
    userData && userData.adoptedTrees.find(({ id }) => id === treeId);

  const treeAge =
    pflanzjahr && pflanzjahr !== 'undefined' && pflanzjahr !== 'NaN'
      ? new Date().getFullYear() - parseInt(pflanzjahr, 10)
      : undefined;


  const getTreeLink = () => window.location.href;

  const handleLink = async () => {
    if (navigator.share) {
      await navigator.share({
        title: 'Baum-Link',
        text: 'Teile den Link zum Baum',
        url: getTreeLink()
      })
      .catch(console.error);
    } else {
      setOpen(true)
    }
  };

  return (
    <Wrapper>
      <Dialog onClose={() => setOpen(false)} aria-labelledby="share-tree-dialog-title" open={open}>
        <DialogTitle id="share-tree-dialog-title">Baum-Link</DialogTitle>
        <DialogContent>
          <DialogContentText>Teile den Link zum Baum:</DialogContentText>
          <DialogContentText>
            <a href={`${getTreeLink()}`}>{getTreeLink()}</a>
            <IconButton onClick={() => copy(getTreeLink())}>
              <FileCopyIcon />
            </IconButton>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Schließen
          </Button>
        </DialogActions>
      </Dialog>
      <FlexColumnDiv>
        {(artdtsch || gattungdeutsch || treeType?.title) && (
          <TreeTitle>
            {artdtsch || gattungdeutsch || treeType?.title}
            {treeIsAdopted && (
              <AdoptedIndication>Adoptiert ✔</AdoptedIndication>
            )}
            <IconButton onClick={handleLink}><ShareIcon /></IconButton>
          </TreeTitle>
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
        {artbot && (
          <InfoContainer>
            <span>Name (wiss.)</span>
            <InfoValue>{artbot}</InfoValue>
          </InfoContainer>
        )}
        {gattung && (
          <InfoContainer>
            <span>Gattung (wiss.)</span>
            <InfoValue>{gattung}</InfoValue>
          </InfoContainer>
        )}
        {treeAge && (
          <>
            <InfoContainer>
              <span>Standalter</span>
              <InfoValue>{treeAge} Jahre</InfoValue>
            </InfoContainer>
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
            </>
          }
          isExpanded
        >
          <StackedBarChart selectedTreeData={selectedTreeData} />
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
              onClick={() => (treeIsAdopted ? unadoptTree() : adoptTree())}
              type='secondary'
            >
              {treeIsAdopted && !isBeingUnadopted && 'Baum unadoptieren'}
              {treeIsAdopted && isBeingUnadopted && 'Baum wird unadoptiert'}
              {!treeIsAdopted && !isBeingAdopted && 'Baum adoptieren'}
              {!treeIsAdopted && isBeingAdopted && 'Baum wird adoptiert'}
            </ButtonRound>
            <ButtonWater />
          </>
        )}
      </FlexColumnDiv>
    </Wrapper>
  );
};

export default TreeInfos;
