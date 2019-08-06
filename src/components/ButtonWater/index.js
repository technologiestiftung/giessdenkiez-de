import React, {Component} from 'react';
import { connect } from "react-redux";
import {render} from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';

import content from '../../assets/content';

import { setWateredTrees } from '../../store/actions/index';

const ButtonWaterSpan = styled.span`
    padding: 10px;
    cursor: pointer;
    background: ${props => props.theme.colorPrimary};
    transition: background ${props => props.theme.timeS} ease-in-out;
    border-radius: ${props => props.theme.borderRadiusS};
    text-align: center;
    
    &:hover {
        background: ${props => props.theme.colorPrimaryHover};
        transition: background ${props => props.theme.timeS} ease-in-out;
    }
`

const mapStateToProps = state => {
    return { 
        selectedTreeData: state.selectedTreeData,
        selectedTreeDataLoading: state.selectedTreeDataLoading 
    };
};

class ButtonWater extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: content
        }

        this._writeDb = this._writeDb.bind(this);
        this.currentTimestamp = this.currentTimestamp.bind(this);
    };

    currentTimestamp() {
        const date = new Date();
        return date.getTime();
    }


    getWateredTrees() {
        const url = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";
        
        axios.get(url)
        .then(res => {
                let watered = [];
                res.data.forEach(tree => {
                    watered.push(tree['_id']);
                })
                this.dispatchSetWateredTrees(watered);
            })
            .catch(err => {
                console.log(err);
        })
    }


    dispatchSetWateredTrees(val) {
        this.props.dispatch(setWateredTrees(val));
    }

    _writeDb() {

        const id = this.props.selectedTreeData['_id'];
        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";
        const url = `${remote}/${id}`;
        
        axios.put(url, this.currentTimestamp())
        .then(res => {
                this.getWateredTrees()
            })
            .catch(err => {
            console.log(err);
        })
    }

    render() {
        console.log(this.state.content.en.sidebar.btnWater)
        return (
            <ButtonWaterSpan onClick={this._writeDb}>{this.state.content.en.sidebar.btnWater}</ButtonWaterSpan>
        )
    }
} 

export default connect(mapStateToProps)(ButtonWater);