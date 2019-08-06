import React, {Component} from 'react';
import { connect } from "react-redux";
import {render} from 'react-dom';
import styled from 'styled-components';

import ButtonWater from '../ButtonWater/index';

import content from '../../assets/content';

const SelectedTreeDiv = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: auto;
    padding: ${props => props.theme.spacingM};
    width: ${props => props.theme.sidebarTileWidth};
    border: 1px solid ${props => props.theme.colorGreyLight};
    border-radius: ${props => props.theme.borderRadiusM};
`

const mapStateToProps = state => {
    return { 
        selectedTreeData: state.selectedTreeData,
        selectedTreeDataLoading: state.selectedTreeDataLoading 
    };
};

class DeckGLMap extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        
        if (!this.props.selectedTreeData) {
            return (
                <SelectedTreeDiv>
                    nothing selected
                </SelectedTreeDiv>
            )
        } else if (this.props.selectedTreeDataLoading) {
            return (
                <SelectedTreeDiv>
                    Finding tree
                </SelectedTreeDiv>
            )
        } else if (this.props.selectedTreeData && !this.props.selectedTreeDataLoading) {
            console.log(this.props.selectedTreeData.properties['NAMENR']);
            return (
                <SelectedTreeDiv>
                    {this.props.selectedTreeData.properties['NAMENR']}
                    <span></span>
                    <ButtonWater></ButtonWater>
                </SelectedTreeDiv>
            )
        }
        
    }

}

export default connect(mapStateToProps)(DeckGLMap);


