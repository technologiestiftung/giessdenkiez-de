import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';

import SelectedTree from '../SelectedTree/index';

const SidebarDiv = styled.div`
    z-index: 3;
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    padding: ${props => props.theme.spacingS}; 
    width: ${props => props.theme.sidebarWidth};
    background: ${props => props.theme.colorGreyVeryLight};
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    border-left: 2px solid #EFEFEF;
`

const mapStateToProps = state => {
    return { articles: state.articles };
};

class Sidebar extends React.Component {
    render() {
        return (
            <SidebarDiv className="sidebar">
                <SelectedTree></SelectedTree>
            </SidebarDiv>
        )
    }
}

export default connect(mapStateToProps)(Sidebar);