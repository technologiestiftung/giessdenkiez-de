import React, {Component} from 'react';
import { connect } from 'unistore/react';
import {render} from 'react-dom';
import styled from 'styled-components';
import classnames from 'classnames';
import Actions from '../../state/Actions';

import ButtonWater from '../ButtonWater/index';

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

const Spinner = styled.div`
    width: 15px;
    height: 15px;
    transform: translateY(3px);
    margin-right: 10px;

    position: relative;
    float: left;

    .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #37DE8A;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
        animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {
        0%, 100% { -webkit-transform: scale(0.0) }
        50% { -webkit-transform: scale(1.0) }
    }

    @keyframes sk-bounce {
        0%, 100% { 
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        } 50% { 
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }
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

const mapStateToProps = state => {
    return {
        selectedTreeData: state.selectedTreeData,
        selectedTreeDataLoading: state.selectedTreeDataLoading,
        wateringTree: state.wateringTree 
    };
};

class SelectedTree extends React.Component {
    constructor(props) {
        super(props);
    };

    convertTime(unix_timestamp) {
        var ms = Number(unix_timestamp);
        console.log(ms)
        var date = new Date(ms);

        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = date.getFullYear();
        var month = months[date.getMonth()];
        var day = date.getDate();

        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        var min = String(minutes).length == 2 ? minutes : `0${minutes}`;
        console.log(minutes);

        // Will display time in 10:30:23 format
        return `Gegossen: ${day}. ${month}. ${year}, ${hours}:${min}`;
        // return day month + '.' + year + '. //' + hours + ':' + minutes.substr(-2);
    }

    render() {
        const { selectedTree, selectedTreeState } = this.props;

        if (selectedTreeState === 'LOADING') {
            return (
                <FilterLoadingDiv>
                    <Spinner>
                        <div className="double-bounce1"></div>
                        <div className="double-bounce2"></div>
                    </Spinner>
                    <span>Lade Informationen zum Baum.</span>
                </FilterLoadingDiv>
            )
        } else if (!selectedTree) {
                return (
                    <SelectedTreeDiv>
                        Kein Baum ausgewählt.
                    </SelectedTreeDiv>
                )
        } else if (selectedTree) {
            const lastWatered =  selectedTree['watered'][selectedTree['watered'].length - 1];

            let treeWatered = '';
            
            //  = selectedTree['watered'].length == 0 ? 'Keine Informationen verfügbar.' : this.convertTime(lastWatered);

            if (selectedTreeState === 'WATERING') {
                treeWatered = 'Bewässerung eintragen ...'
            } else if (selectedTree['watered'].length == 0) {
                treeWatered = 'Keine Informationen verfügbar.';
            } else {
                treeWatered = this.convertTime(lastWatered);
            }

            const stateWaterTreeClass = classnames({
                noInfo: treeWatered == 'Keine Informationen verfügbar.',
                watering: treeWatered == 'Bewässerung eintragen ...',
                treeState: true
            })

            const kroneDurch = selectedTree['kroneDurch']

            const pflanzJahr = String(selectedTree['pflanzJahr']);
            const standalter = String(selectedTree['standAlter']).length == 0 ? '' : ` (${selectedTree['standAlter']} Jahre)`;

            const hausNr = selectedTree['hausNr'] != null ? `, ${selectedTree['hausNr']}` : '';

            return (
                <SelectedTreeDiv>

                    <div className="intro-wrapper">
                        <FlexColumnDiv>
                            <TreeTitle>{selectedTree['artDtsch']}</TreeTitle>
                            <SublineSpan>{selectedTree['gattungDeutsch'].toLowerCase()}</SublineSpan>
                            <span className={stateWaterTreeClass}>{treeWatered}</span>
                            <SublineSpanClose>{selectedTree['strName']}{hausNr}</SublineSpanClose>
                            <SublineSpan>{selectedTree['bezirk']}</SublineSpan>

                            <FlexColumnDiv>
                                <DescriptionSpan>Baumhöhe</DescriptionSpan>
                                <SublineSpanDesc>{selectedTree['baumHoehe']} m</SublineSpanDesc>
                            </FlexColumnDiv>

                            <FlexColumnDiv>
                                <DescriptionSpan>Stammumfang</DescriptionSpan>
                                <SublineSpanDesc>{selectedTree['stammUmfg']} cm</SublineSpanDesc>
                            </FlexColumnDiv>

                            { selectedTree['kroneDurch'] != 'null' && (
                                <FlexColumnDiv>
                                    <DescriptionSpan>Kronendurchmesser</DescriptionSpan>
                                    <SublineSpanDesc>{selectedTree['kroneDurch']} m</SublineSpanDesc>
                                </FlexColumnDiv>
                            )}


                            <FlexColumnDiv>
                                <DescriptionSpan>Gepflanzt</DescriptionSpan>
                                <SublineSpan>{pflanzJahr}{standalter}</SublineSpan>
                            </FlexColumnDiv>

                        </FlexColumnDiv>
                    </div>
                    <ButtonWater></ButtonWater>
                </SelectedTreeDiv>
            )
        }
    }
}

export default connect(state => ({
    selectedTree: state.selectedTree,
    selectedTreeState: state.selectedTreeState
}), Actions)(SelectedTree);


