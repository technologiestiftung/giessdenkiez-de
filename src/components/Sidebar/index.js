import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import { Range } from 'rc-slider';

const FilterAgeDiv = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: auto;
    margin-top: 10px;
    padding: ${props => props.theme.spacingM};
    width: ${props => props.theme.sidebarTileWidth};
    border: 2px solid ${props => props.theme.colorGreyLight};
    border-radius: ${props => props.theme.borderRadiusM};
    margin-bottom: 20px;
`

import SelectedTree from '../SelectedTree/index';

const SidebarDiv = styled.div`
    z-index: 3;
    position: absolute;
    right: 0;
    top: 0;
    width: 320px;
    height: 100%;
    overflow: hidden;
    padding: 0 ${props => props.theme.spacingM}; 
    background: ${props => props.theme.colorGreyVeryLight};
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    border-left: 2px solid #EFEFEF;
`
const IntroDiv = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: auto;
    padding: ${props => props.theme.spacingM};
    width: ${props => props.theme.sidebarTileWidth};
    margin-bottom: 20px;
`


const LegendDiv = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    height: auto;
    padding: ${props => props.theme.spacingM};
    width: ${props => props.theme.sidebarTileWidth};
    border: 2px solid ${props => props.theme.colorGreyLight};
    border-radius: ${props => props.theme.borderRadiusM};
    margin-bottom: 20px;

    div { 
        display: flex;
        flex-direction: row;

        &:first-of-type {
            div {
                background: rgb(102, 245, 173);
            }
        }

        &:last-of-type {
            div {
                background: rgb(164, 181, 222);
            }
        }

        div {
            
            width: 15px;
            transform: translateY(2px);
            margin-right: 10px;
            height: 15px;
            border-radius: 100px;
            background:red;
        }
    }
`

const mapStateToProps = state => {
    return { 
        wateredTrees: state.wateredTrees,
        wateredTreesFetched: state.wateredTreesFetched,
        selectedTreeDataLoading: state.selectedTreeDataLoading,
        selectedTreeData: state.selectedTreeData,
        dataLoaded: state.dataLoaded
    };
};

class Sidebar extends React.Component {


    legend() {
        return <LegendDiv>
            <div>
                <div></div>
                Bewässert
            </div>
            <div>
                <div></div>
                Nicht bewässert
            </div>
        </LegendDiv>
    }

    intro() {
        if (!this.props.selectedTreeData) {
            return <IntroDiv>
                <h2>Berlin of Trees</h2>
                <span>Die Baumversorgung</span>
            </IntroDiv>
        }
    }

    render() {
        return (
            <SidebarDiv className="sidebar">
                <div>
                    {this.intro()}
                    <SelectedTree></SelectedTree>
                    <FilterAgeDiv>
                        <Range min={0} max={150} marks={{ 20: 20, 40: 40, 100: 100 }}/>
                    </FilterAgeDiv>
                </div>
                {this.legend()}
            </SidebarDiv>
        )
    }
}

export default connect(mapStateToProps)(Sidebar);