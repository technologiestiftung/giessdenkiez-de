import React, {Component} from 'react';
import { connect } from 'unistore/react';
import {render} from 'react-dom';
import styled from 'styled-components';
import axios from 'axios';
import Store from '../../state/Store';
import Actions from '../../state/Actions';
import content from '../../assets/content';
import { fetchAPI, createAPIUrl } from '../../state/utils';

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

const ButtonWater = (p) => {
    const { selectedTree, state } = p;
    const { id } = selectedTree;

    const timeNow = () => {
        const date = + new Date;
        return date;
    }

    const waterTree = (id) => {
        Store.setState({ selectedTreeState: 'WATERING' });
        const time = timeNow();
        const url = createAPIUrl(state, `/api/water-tree?id=${id}&timestamp=${time}`);

		const res = fetchAPI(url)
            .then(r => {
                const url = createAPIUrl(state, `/api/get-tree?id=${id}`);
                const res = fetchAPI(url)
                    .then(r => { Store.setState({ selectedTreeState: 'WATERED', selectedTree: r.data }); });
            })
    }

    return (
        <ButtonWaterSpan onClick={() => {waterTree(id)}}>{content.en.sidebar.btnWater}</ButtonWaterSpan> // onClick={this._writeDb}
    )
}

export default connect(state => ({
    selectedTree: state.selectedTree,
    state: state
}), Actions)(ButtonWater);

