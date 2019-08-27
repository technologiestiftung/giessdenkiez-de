import React, {Component} from 'react';
import styled from 'styled-components';
import classnames from 'classnames';
import { connect } from "react-redux";

import { setTabActive } from '../../store/actions/index';

const DivWrapper = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    font-size: 12px;
`;

const ButtonSelect = styled.span`
    border-radius: 0px;
    border-top: 2px solid ${props => props.theme.colorGreyLight};
    border-bottom: 2px solid ${props => props.theme.colorGreyLight};
    font-size: ${props => props.theme.fontSizeXL} !important;
    padding: 6px;
    width: 93px;
    padding-top: 6px;
    padding-bottom: 6px;
    cursor: pointer;
    text-align: center;

    &:nth-of-type(2) {
        border-right: 2px solid ${props => props.theme.colorGreyLight};
    }

    &:first-of-type {
        border-radius: 12px 0 0 12px
        border-left: 2px solid ${props => props.theme.colorGreyLight};
        border-right: 2px solid ${props => props.theme.colorGreyLight};
    }

    &:last-of-type {
        border-radius: 0px 12px 12px 0px
        border-right: 2px solid ${props => props.theme.colorGreyLight};
    }

    &.active {
        background: ${props => props.theme.colorGreyLight};
    }
`;

const mapStateToProps = state => {
    return { 
        tabActive: state.tabActive
    };
};

class Divider extends React.Component {

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }

    dispatchActiveTab(val) {
        this.props.dispatch(setTabActive(val))
    }

    handleClick(evt) {
        let btns = document.querySelectorAll('.type-btn');

        btns.forEach(btn => {
            btn.classList.remove('active');
        })

        this.dispatchActiveTab(evt.target.id)

        document.querySelector(`#${evt.target.id}`).classList.add('active');        
    }
    
    render() {
        return (
            <DivWrapper>
                <ButtonSelect className="type-btn active" id="id-0" onClick={(e) => { this.handleClick(e) }}>Alter</ButtonSelect>
                <ButtonSelect className="type-btn" id="id-1" onClick={(e) => { this.handleClick(e) }}>Gattung</ButtonSelect>
                <ButtonSelect className="type-btn" id="id-2" onClick={(e) => { this.handleClick(e) }}>Größe</ButtonSelect>
            </DivWrapper>
        )
    }
};


export default connect(mapStateToProps)(Divider);