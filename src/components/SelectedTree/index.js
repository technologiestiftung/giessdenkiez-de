import React, {Component} from 'react';
import { connect } from 'unistore/react';
import {render} from 'react-dom';
import styled from 'styled-components';
import classnames from 'classnames';
import Actions from '../../state/Actions';
import { convertTime } from '../../utils/';

import Spinner from '../Spinner'
import ButtonWater from '../ButtonWater';
import Property from './Property';

import content from '../../assets/content';

const FilterLoadingDiv = styled.div`
    display: flex;
    flex-direction: row;
    z-index: 3;
    height: auto;
    margin-top: 10px;
    padding: ${props => props.theme.spacingM};
    width: ${props => props.theme.sidebarTileWidth};
    border-radius: ${props => props.theme.borderRadiusS};
    margin-bottom: 10px;
    background: white;
`

const SelectedTreeDiv = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: auto;
    margin-top: 10px;
    width: ${props => props.theme.sidebarTileWidth};
    padding: ${props => props.theme.spacingM};
    border-radius: ${props => props.theme.borderRadiusS};
    background: white;
    box-shadow: 0px 2px 3px 0px rgba(44,48,59,0.1);
`

const TreeTitle = styled.h2`
    font-size: 24px;
    font-weight: 600;
    margin-top: 0px;
    line-height: 125%;
    margin-bottom: 5px;
`;

const LastWateredSpan = styled.span`
    border: 2px solid #FF8484;
    color: #FF8484;
    border-radius: ${props => props.theme.borderRadiusS};
    padding: 10px;
    padding-bottom: 11px;
    margin-bottom: 20px;
`;

const LastWateredSpanWatering = styled.span`
    border: 2px solid ${props => props.theme.colorPrimary};
    color: ${props => props.theme.colorPrimary};
    border-radius: ${props => props.theme.borderRadiusS};
    padding: 10px;
    padding-bottom: 11px;
    margin-bottom: 20px;
    opacity: 1;
    animation: pulse 1s infinite ease-in-out;
`;

const SublineSpan = styled.span`
    margin-bottom: 20px;
    text-transform: capitalize;
`

const SublineSpanDesc = styled.span`
    margin-bottom: 10px;
`

const wateringSpan = styled.span`

`

const SublineSpanClose = styled.span`
    margin-bottom: 3px;
`

const DescriptionSpan = styled.span`
    opacity: .3;
    margin-bottom: 2px;
`

const FlexRowDiv = styled.div`
    display: flex;
    flex-direction: row;
`

const FlexColumnDiv = styled.div`
    display: flex;
    flex-direction: column;
`

const SelectedTree = (p) => {
    const { selectedTree, selectedTreeState } = p;
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
    } = selectedTree;

    let treeWatered = '';
    let lastWatered = '';

    if (watered) {
        const lastWatered =  watered[watered.length - 1];

        if (selectedTreeState === 'WATERING') {
            treeWatered = 'Bewässerung eintragen ...'
        } else if (watered.length == 0) {
            treeWatered = 'Keine Informationen verfügbar.';
        } else {
            treeWatered = convertTime(lastWatered);
        }
    }

    const stateWaterTreeClass = classnames({
        noInfo: treeWatered == 'Keine Informationen verfügbar.',
        watering: treeWatered == 'Bewässerung eintragen ...',
        treeState: true
    })

    return (
        <>
            { (selectedTreeState === 'LOADING') && (
                    <FilterLoadingDiv>
                        <Spinner>
                            <div className="double-bounce1"></div>
                            <div className="double-bounce2"></div>
                        </Spinner>
                        <span>Lade Informationen zum Baum.</span>
                    </FilterLoadingDiv>
            ) }

            { (!selectedTree && selectedTreeState !== 'LOADING') && (
                <SelectedTreeDiv>
                    Kein Baum ausgewählt.
                </SelectedTreeDiv>
            ) }

            { (selectedTree && selectedTreeState !== 'LOADING') && (

                <SelectedTreeDiv>
                    <div className="intro-wrapper">
                        <FlexColumnDiv>
                            <TreeTitle>{artDtsch}</TreeTitle>
                            <SublineSpan>{gattungDeutsch.toLowerCase()}</SublineSpan>
                            <span className={stateWaterTreeClass}>{treeWatered}</span>
                            <SublineSpanClose>{strName}{hausNr}</SublineSpanClose>
                            <SublineSpan>{bezirk}</SublineSpan>
                            <Property name="Baumhöhe:" value={Property}/>
                            <Property name="Stammumfang:" value={stammUmfg}/>
                            <Property name="Kronendurchmesser:" value={kroneDurch}/>
                            <Property name="Gepflanzt:" value={`${pflanzJahr} (${standAlter} Jahre)`}/>
                        </FlexColumnDiv>
                    </div>
                    <ButtonWater/>
                </SelectedTreeDiv>
            )}

        </>
    )
}

export default connect(state => ({
    selectedTree: state.selectedTree,
    selectedTreeState: state.selectedTreeState
}), Actions)(SelectedTree);


