import React, {Component} from 'react';
import { connect } from "react-redux";
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'rc-slider';

const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Range = createSliderWithTooltip(Slider.Range);

import { setTreeAgeDataLoading, setTreeAgeData, setTreeAgeDataUpdated, setWateredTreeDataUpdated, setDataIncluded } from '../../store/actions/index';

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

const FlexRowDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

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

const TreesCountSpan = styled.span`
    transform: translateX(-4px);
    margin-top: 10px;
    opacity: .5;
    font-size: 12px;
`;

const LegendDiv = styled.div`
    display: flex;
    flex-direction: column;
    z-index: 3;
    font-size: 12px;
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
                opacity: 1;
            }
        }

        &:last-of-type {
            div {
                background: rgb(164, 181, 222);
                opacity: 1;
            }
        }

        div {
            
            width: 12px;
            transform: translateY(2px);
            margin-right: 10px;
            height: 12px;
            border-radius: 100px;
            background:red;
            opacity: 1;
        }
    }
`

const TileHeadline = styled.span`
    opacity: 1;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    transform: translateX(-4px);
`;

const ButtonWaterSpan = styled.span`
    padding: 6px;
    cursor: pointer;
    width: 70px;
    margin-left: 30px;
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
        wateredTrees: state.wateredTrees,
        wateredTreesFetched: state.wateredTreesFetched,
        selectedTreeDataLoading: state.selectedTreeDataLoading,
        treeAgeDataLoading: state.treeAgeDataLoading,
        treeAgeData: state.treeAgeData,
        selectedTreeData: state.selectedTreeData,
        dataLoaded: state.dataLoaded,
    };
};

class Sidebar extends React.Component {

    constructor(props) {
        super(props);

        this.fetched = [];
    
        this.state = {
            min: 0,
            max: 320,
            skip: 0,
        };
        
        this.limit = 8000;

        this.getTreesByAge = this.getTreesByAge.bind(this);
        this.setRange = this.setRange.bind(this);
        this.ageRange = this.ageRange.bind(this);
        this.collectTrees = this.collectTrees.bind(this);
        this.addToGroups = this.addToGroups.bind(this);
        this.promiseGet = this.promiseGet.bind(this);
    };

    legend() {
        return <LegendDiv>
            <TileHeadline>Legende</TileHeadline>
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

    dispatchSetTreeAgeDataLoading(state) {
        this.props.dispatch(setTreeAgeDataLoading(state))
    }

    dispatchSetTreeAgeDataUpdated(state) {
        this.props.dispatch(setTreeAgeDataUpdated(state))
    }

    dispatchSetWateredTreeDataUpdated(state) {
        this.props.dispatch(setWateredTreeDataUpdated(state))
    }

    dispatchSetTreeAgeData(state) {
        this.props.dispatch(setTreeAgeData(state))
    }
    
    intro() {
        if (!this.props.selectedTreeData) {
            return <IntroDiv>
                <h2>Berlin of Trees</h2>
                <span>Die Baumversorgung</span>
            </IntroDiv>
        }
    }

    dispatchSetDataIncluded(data) {
        this.props.dispatch(setDataIncluded(data))
    }

    createIncludedTreesObj(arr) {
        let obj = {};
        arr.forEach(id => {
            obj[id] = true;
        })

        this.dispatchSetDataIncluded(obj);
    }

    setRange(arr) {
        this.setState({ min: arr[0], max: arr[1] });
    }

    setSkip(val) {
        this.setState({skip: val});
    }

    collectTrees(skip, limit) {
        const arr = [this.state.min, this.state.max];
        const query = `?start=${arr[0]}&end=${arr[1]}&skip=${skip}&limit=${limit}`;
        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/age/limited";
        const url = `${remote}${query}`;

        return this.promiseGet(url);
    }

    collectCountTrees() {
        const arr = [this.state.min, this.state.max];
        const query = `?start=${arr[0]}&end=${arr[1]}`;
        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/age/count";
        const url = `${remote}${query}`;

        return this.promiseGet(url);
    }

    promiseGet(url) {

        console.log(url);
        return new Promise((resolve, reject) => {
            axios.get(url)
                .then(res => {
                    if (res.data.length > 1) {
                        this.fetched.push(res.data);
                    }
                    resolve(res.data);
                })
                .catch(err => {
                    console.log(err);
                    reject(err);
            })
        })
    }

    addToGroups() {
        let promiseArr = [];
        let offset = 0;
        let iterator
        
        return new Promise((resolve, reject) => {

                this.dispatchSetTreeAgeDataLoading(true);
                this.fetched = [];

                this.collectCountTrees()
                .then(data => {
                    iterator = Math.ceil(data / this.limit);
                    
                    for (let index = 0; index < iterator; index++) {
                        const offset = index == 0 ? 0 : index * this.limit;
                        promiseArr.push(this.collectTrees(offset, this.limit))
                    }
                    
                    Promise.all(promiseArr).then(data => {
                        this.fetched = this.fetched.flat();
                        this.dispatchSetWateredTreeDataUpdated(false);
                        this.dispatchSetTreeAgeDataUpdated(true);
                        this.dispatchSetTreeAgeDataLoading(false);
                        this.dispatchSetTreeAgeData(this.fetched);
                        this.createIncludedTreesObj(this.fetched);
                    }).catch(err => {
                        console.log(err)
                    });

                }).catch(reject);
        });
    }



    getTreesByAgeLimited() {
        const arr = [this.state.min, this.state.max];
        const query = `?start=${arr[0]}&end=${arr[1]}&skip=${this.state.skip}&limit=${this.state.limit}`;
        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/age/limited";
        const url = `${remote}${query}`;

        this.dispatchSetTreeAgeDataLoading(true);

        return axios.get(url)
        .then(res => {
            console.log(res.data);
            this.dispatchSetWateredTreeDataUpdated(false);
            this.dispatchSetTreeAgeDataUpdated(true);
            this.dispatchSetTreeAgeDataLoading(false);
            this.dispatchSetTreeAgeData(res.data);
            this.createIncludedTreesObj(res.data);

            this.setSkip(this.state.skip + this.state.limit);
            
            return this.getTreesByAgeLimited()
            })
            .catch(err => {
                return 
                console.log(err);
        })


    }

    getTreesByAge() {
        const arr = [this.state.min, this.state.max];
        const query = `?start=${arr[0]}&end=${arr[1]}`;
        const remote = "https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/age";
        const url = `${remote}${query}`;
        
        console.log('querying', url, this.state);

        this.dispatchSetTreeAgeDataLoading(true);
        
        axios.get(url)
        .then(res => {
            console.log(res.data);
            this.dispatchSetWateredTreeDataUpdated(false);
            this.dispatchSetTreeAgeDataUpdated(true);
            this.dispatchSetTreeAgeDataLoading(false);
            this.dispatchSetTreeAgeData(res.data);
            this.createIncludedTreesObj(res.data);
            })
            .catch(err => {
            console.log(err);
        })
    }

    handleChange(event) {
        console.log(event)
    }

    ageRange() {
        const treesCount = this.props.treeAgeData != undefined ? `${this.props.treeAgeData.length} Bäume` : 'Keine Bäume Ausgewählt'
        if (!this.props.treeAgeDataLoading) {
            return (
                <FilterAgeDiv>
                    <TileHeadline>Pflanzalter: {this.state.min}-{this.state.max} Jahre</TileHeadline>
                    <FlexRowDiv>
                        <Range 
                            min={0} 
                            max={320} 
                            marks={{ 0: 0, 80: 80, 160: 160, 240: 240, 320: 320 }} 
                            onChange={this.setRange}
                            // onAfterChange={this.setRange}
                            defaultValue={[this.state.min,this.state.max]}
                        />
                        <ButtonWaterSpan onClick={this.addToGroups}>Filter</ButtonWaterSpan>
                    </FlexRowDiv>
                    <TreesCountSpan>{treesCount}</TreesCountSpan>
                </FilterAgeDiv>
            )
        } else if (this.props.treeAgeDataLoading) {
            return (
                <FilterAgeDiv>
                    Zähle Bäume ...
                </FilterAgeDiv>
            )
        }
    }

    render() {
        return (
            <SidebarDiv className="sidebar">
                <div>
                    {/* {this.intro()} */}
                    <SelectedTree></SelectedTree>
                    {this.ageRange()}
                </div>
                {this.legend()}
            </SidebarDiv>
        )
    }
}

export default connect(mapStateToProps)(Sidebar);