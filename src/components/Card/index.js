import React from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { convertTime } from '../../utils/';
import Actions from '../../state/Actions';
import { connect } from 'unistore/react';

import CardWrapper from './CardWrapper/';
import CardProperty from './CardProperty/';
import ButtonWater from '../ButtonWater/';

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const SublineSpan = styled.span`
    margin-bottom: 20px;
    text-transform: capitalize;
`

const TreeTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
    margin-top: 0px;
    line-height: 125%;
    margin-bottom: 5px;
`;

const SublineSpanClose = styled.span`
    margin-bottom: 3px;
`

const Card = p => {
  const { data, selectedTree, selectedTreeState } = p;

  const {
    watered,
    kroneDurch,
    baumHoehe,
    stammUmfg,
    standAlter,
    pflanzJahr,
    artDtsch,
    gattungDeutsch,
    strName,
    hausNr,
    bezirk
  } = data;

  let treeWatered = '';

  if (watered) {

      if (selectedTreeState === 'WATERING') {
          treeWatered = 'Bewässerung eintragen ...'
      } else if (watered.length == 0) {
          treeWatered = 'Keine Informationen verfügbar.';
      } else {
          treeWatered = convertTime(watered);
      }
  }

  const stateWaterTreeClass = classnames({
    noInfo: treeWatered == 'Keine Informationen verfügbar.',
    watering: treeWatered == 'Bewässerung eintragen ...',
    treeState: true
  })

  return (
    <CardWrapper>
      <FlexColumnDiv>
        <TreeTitle>{artDtsch}</TreeTitle>
        <SublineSpan>{gattungDeutsch.toLowerCase()}</SublineSpan>
        <span className={stateWaterTreeClass}>{treeWatered}</span>
        <SublineSpanClose>{strName}{hausNr}</SublineSpanClose>
        <SublineSpan>{bezirk}</SublineSpan>
        <CardProperty name="Baumhöhe:" value={baumHoehe}/>
        <CardProperty name="Stammumfang:" value={stammUmfg}/>
        <CardProperty name="Kronendurchmesser:" value={kroneDurch}/>
        <CardProperty name="Gepflanzt:" value={`${pflanzJahr} (${standAlter} Jahre)`}/>
        <ButtonWater/>
      </FlexColumnDiv>
    </CardWrapper>
  )
}

export default connect(state => ({
    selectedTree: state.selectedTree,
    selectedTreeState: state.selectedTreeState
}), Actions)(Card);
