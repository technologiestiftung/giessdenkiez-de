import React, {Component} from 'react';
import { connect } from 'unistore/react';
import {render} from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Actions from '../../state/Actions';

import content from '../../assets/content';

import { setWateredTrees, setWateringTree, setDataIncluded, setSelectedTreeData, setWateredTreeDataUpdated, setTreeAgeDataUpdated } from '../../store/actions/index';

const ButtonWaterSpan = styled.span`
    padding: 10px;
    cursor: pointer;
    background: ${props => props.theme.colorPrimary};
    transition: background ${props => props.theme.timeS} ease-in-out;
    border-radius: ${props => props.theme.borderRadiusS};
    text-align: center;
    font-size: ${props => props.theme.fontSizeL};

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

        // this._writeDb = this._writeDb.bind(this);
        // this.currentTimestamp = this.currentTimestamp.bind(this);
        // this.getTree = this.getTree.bind(this);
    };

    currentTimestamp() {
        const date = new Date();
        console.log(date);
        return date.getTime();
    }

    dispatchSetTreeAgeDataUpdated(state) {
        this.props.dispatch(setTreeAgeDataUpdated(state))
    }

    dispatchSetWateredTreeDataUpdated(state) {
        this.props.dispatch(setWateredTreeDataUpdated(state))
    }

    dispatchSetDataIncluded(data) {
        this.props.dispatch(setDataIncluded(data))
    }

    createIncludedTreesObj(arr) {
        let obj = {};
        arr.forEach(id => {
            obj[id] = { included: true};
        })

        this.dispatchSetDataIncluded(obj);
    }

    dispatchSetSelectedTreeData(val) {
        this.props.dispatch(setSelectedTreeData(val.data));
    }

    getWateredTrees() {
        const url = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";

        axios.get(url)
        .then(res => {
                let watered = [];
                res.data.forEach(tree => {
                    watered.push(tree['_id']);
                })

                console.log(watered);

                this.createIncludedTreesObj(watered);
                this.dispatchSetWateringTree(false);

                this.dispatchSetTreeAgeDataUpdated(false);
                this.dispatchSetWateredTreeDataUpdated(true);
            })
            .catch(err => {
                console.log(err);
        })
    }

    dispatchSetWateredTrees(val) {
        this.props.dispatch(setWateredTrees(val));
    }

    dispatchSetWateringTree(val) {
        this.props.dispatch(setWateringTree(val));
    }

    dispatchSetDataIncluded(val) {
        this.props.dispatch(setDataIncluded(val));
    }

    createIncludedTreesObj(arr) {
        let obj = {};
        arr.forEach(id => {
            obj[id] = { included: true};
        })

        this.dispatchSetDataIncluded(obj);
    }

    // _writeDb() {
    //     const id = this.props.selectedTreeData['_id'];
    //     const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees";
    //     const url = `${remote}/${id}`;

    //     this.dispatchSetWateringTree(true);

    //     axios.put(url, this.currentTimestamp())
    //     .then(res => {
    //             this.getWateredTrees()
    //             this.getTree();
    //         })
    //         .catch(err => {
    //         console.log(err);
    //     })
    // }

    render() {
        console.log(this.state.content.en.sidebar.btnWater)
        return (
            <ButtonWaterSpan >{this.state.content.en.sidebar.btnWater}</ButtonWaterSpan> // onClick={this._writeDb}
        )
    }
} 


export default connect(state => ({
    selectedTree: state.selectedTree
}), Actions)(ButtonWater);

