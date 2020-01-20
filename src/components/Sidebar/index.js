import React, { useState, setState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Slider from 'rc-slider';
import { connect } from 'unistore/react';
import { Route, Switch } from "react-router-dom";
import { wateredTreesSelector } from '../../state/Selectors';
import Actions from '../../state/Actions';

import Divider from '../DividerSelect';
import Tags from '../Tags';
import Legend from '../Legend';
import Profile from '../Profile';
import Spinner from '../Spinner';

import NavBar from '../Navbar/';
import { useAuth0 } from "../../utils/auth0";

const createSliderWithTooltip = Slider.createSliderWithTooltip;

const Range = createSliderWithTooltip(Slider.Range);

import { setTreeAgeDataLoading, setTreeAgeData, setTreeAgeDataUpdated, setTreeSizeData, setTreeSizeDataUpdated, setTreeSizeDataLoading, setWateredTreeDataUpdated, setTreeTypeDataUpdated, setDataIncluded } from '../../store/actions/index';

const FilterAgeDiv = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 3;
  height: auto;
  margin-top: 10px;
  padding: ${props => props.theme.spacingM};
  width: ${props => props.theme.sidebarTileWidth};
  border-radius: ${props => props.theme.borderRadiusS};
  margin-bottom: 10px;
  background: white;
  box-shadow: 0px 2px 3px 0px rgba(44,48,59,0.1);
`

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
  box-shadow: 0px 2px 3px 0px rgba(44,48,59,0.1);
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
  border-left: 1px solid ${props => props.theme.colorGreyVeryLight};
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
  font-size: ${props => props.theme.fontSizeL};
  transform: translateY(-3px);
  
  &:hover {
      background: ${props => props.theme.colorPrimaryHover};
      transition: background ${props => props.theme.timeS} ease-in-out;
  }
`

const Sidebar = (p) => {
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);


      // this.fetched = [];
  
      // this.state = {
      //     min: 0,
      //     max: 320,
      //     minHeight: 0,
      //     maxHeight: 20,
      //     skip: 0,
      //     limit: 8000
      // };
      
      // this.limit = 8000;


  const intro = () => {
      if (!this.props.selectedTreeData) {
          return <IntroDiv>
              <h2>Berlin of Trees</h2>
              <span>Die Baumversorgung</span>
          </IntroDiv>
      }
  }

  const createIncludedTreesObj = (arr) => {
      let obj = {};
      arr.forEach(id => {
          obj[id] = { included: true};
      })


      this.dispatchSetDataIncluded(obj);
  }

  const setRange = (arr) => {
      this.setState({ min: arr[0], max: arr[1] });
  }

  const setRangeHeight = (arr) => {
      console.log(arr);
      this.setState({ minHeight: arr[0], maxHeight: arr[1] });
  }

  const setSkip = (val) => {
      this.setState({skip: val});
  }

  const collectTrees = (skip, limit, arg) => {
      const arr = [this.state.min, this.state.max];
      const query = `?start=${arr[0]}&end=${arr[1]}&skip=${skip}&limit=${limit}`;
      const remote = `https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/${arg}/limited`;
      const url = `${remote}${query}`;

      return this.promiseGet(url);
  }

  const collectTreesSize = (skip, limit, arg) => {
      const arr = [this.state.minHeight, this.state.maxHeight];
      const query = `?start=${arr[0]}&end=${arr[1]}&skip=${skip}&limit=${limit}`;
      const remote = `https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/${arg}/limited`;
      const url = `${remote}${query}`;

      return this.promiseGet(url);
  }

  const countTreesSize = (arg) => {
      const arr = [this.state.minHeight, this.state.maxHeight];
      console.log(arr);
      const query = `?start=${arr[0]}&end=${arr[1]}`;
      const remote = `https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/size/count`;
      const url = `${remote}${query}`;

      return this.promiseGet(url);
  }

  const countTreesAge = (arg) => {
      const arr = [this.state.min, this.state.max];
      const query = `?start=${arr[0]}&end=${arr[1]}`;
      const remote = `https://dshbp72tvi.execute-api.us-east-1.amazonaws.com/dev/trees/age/count`;
      const url = `${remote}${query}`;

      return this.promiseGet(url);
  }

  const promiseGet = (url) => {

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

  const fetchSize = () => {
      let promiseArr = [];
      let offset = 0;
      let iterator
      let queryType = 'size';
      
      return new Promise((resolve, reject) => {

              this.dispatchSetTreeSizeDataLoading(true);
              this.fetched = [];

              this.countTreesSize()
              .then(data => {
                  iterator = Math.ceil(data / this.limit);
                  
                  for (let index = 0; index < iterator; index++) {
                      const offset = index == 0 ? 0 : index * this.limit;
                      promiseArr.push(this.collectTreesSize(offset, this.limit, queryType))
                  }
                  
                  Promise.all(promiseArr).then(data => {
                      this.fetched = this.fetched.flat();
                      this.dispatchSetWateredTreeDataUpdated(false);
                      this.dispatchSetTreeAgeDataUpdated(false);
                      this.dispatchSetTreeTypeDataUpdated(false);
                      this.dispatchSetTreeSizeDataUpdated(true);

                      this.dispatchSetTreeSizeDataLoading(false);
                      this.dispatchSetTreeSizeData(this.fetched);

                      this.dispatchSetTreeSizeData(this.fetched);
                      this.createIncludedTreesObj(this.fetched);
                  }).catch(err => {
                      console.log(err)
                  });

              }).catch(reject);
      });
  }

  const fetchAge = () => {
      let promiseArr = [];
      let offset = 0;
      let iterator

      return new Promise((resolve, reject) => {

              this.dispatchSetTreeAgeDataLoading(true);
              this.fetched = [];

              this.countTreesAge()
              .then(data => {
                  iterator = Math.ceil(data / this.limit);

                  for (let index = 0; index < iterator; index++) {
                      const offset = index == 0 ? 0 : index * this.limit;
                      promiseArr.push(this.collectTrees(offset, this.limit, 'age'))
                  }

                  Promise.all(promiseArr).then(data => {
                      this.fetched = this.fetched.flat();
                      this.dispatchSetWateredTreeDataUpdated(false);
                      this.dispatchSetTreeAgeDataUpdated(false);
                      this.dispatchSetTreeTypeDataUpdated(false);
                      this.dispatchSetTreeSizeDataUpdated(true);
                      this.dispatchSetTreeAgeDataLoading(false);

                      this.dispatchSetTreeAgeData(this.fetched);
                      this.createIncludedTreesObj(this.fetched);
                  }).catch(err => {
                      console.log(err)
                  });

              }).catch(reject);
      });
  }

  const handleChange = (event) => {
      console.log(event)
  }

  const ageRange = () => {
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
                      <ButtonWaterSpan onClick={this.fetchAge}>Filter</ButtonWaterSpan>
                  </FlexRowDiv>
                  <TreesCountSpan>{treesCount}</TreesCountSpan>
              </FilterAgeDiv>
          )
      } else if (this.props.treeAgeDataLoading) {
          return (
              <FilterLoadingDiv>
                  <Spinner>
                      <div className="double-bounce1"></div>
                      <div className="double-bounce2"></div>
                  </Spinner>
                  <span>Zähle Bäume ...</span>
              </FilterLoadingDiv>
          )
      }
  }

  // const heightRange = () => {
  //     const treesCount = this.props.treeSizeData != undefined ? `${this.props.treeSizeData.length} Bäume` : 'Keine Bäume Ausgewählt'
  //     if (!this.props.treeSizeDataLoading) {
  //         return (
  //             <FilterAgeDiv>
  //                 <TileHeadline>Baumhöhe: {this.state.minHeight}-{this.state.maxHeight} meter</TileHeadline>
  //                 <FlexRowDiv>
  //                     <Range 
  //                         min={0} 
  //                         max={20} 
  //                         marks={{ 0: 0, 20: 20}} 
  //                         onChange={this.setRangeHeight}
  //                         // onAfterChange={this.setRange}
  //                         defaultValue={[this.state.minHeight,this.state.maxHeight]}
  //                     />
  //                     <ButtonWaterSpan onClick={this.fetchSize}>Filter</ButtonWaterSpan>
  //                 </FlexRowDiv>
  //                 <TreesCountSpan>{treesCount}</TreesCountSpan>
  //                 {/* <br></br>
  //                 <TileHeadline>Krone Durchmesser: {this.state.minHeight}-{this.state.maxHeight} meter</TileHeadline>
  //                 <FlexRowDiv>
  //                     <Range 
  //                         min={0} 
  //                         max={20} 
  //                         marks={{ 0: 0, 20: 20}} 
  //                         onChange={this.setRangeHeight}
  //                         // onAfterChange={this.setRange}
  //                         defaultValue={[this.state.minHeight,this.state.maxHeight]}
  //                     />
  //                     <ButtonWaterSpan onClick={this.addToGroups}>Filter</ButtonWaterSpan>
  //                 </FlexRowDiv>
  //                 <TreesCountSpan>{treesCount}</TreesCountSpan> */}
  //             </FilterAgeDiv>
  //         )
  //     } else if (this.props.treeSizeDataLoading) {
  //         return (
  //             <FilterLoadingDiv>
  //                 <Spinner>
  //                     <div className="double-bounce1"></div>
  //                     <div className="double-bounce2"></div>
  //                 </Spinner>
  //                 <span>Zähle Bäume ...</span>
  //             </FilterLoadingDiv>
  //         )
  //     }
  // }

  const { loading } = useAuth0();
  
  return (
        <SidebarDiv className="sidebar">
            <div>
                <Divider/>
                {/* {ageRange()} */}
                <SelectedTree></SelectedTree>
                {loading && ( <div>Loading...</div> )}
                {!loading && ( <NavBar /> )}
                <Switch>
                  <Route path="/" exact />
                  <Route path="/profile" component={Profile} />
                </Switch>
            </div>
            <Legend/>
        </SidebarDiv>
    )
      // } else if (this.props.tabActive == 'id-1') {
      //     return (
      //         <SidebarDiv className="sidebar">
      //             <div>
      //                 <Divider/>
      //                 <Tags/>
      //                 <SelectedTree></SelectedTree>
      //             </div>
      //             { this.props.wateredTreeDataUpdated ? <Legend/> : null }
      //         </SidebarDiv>
      //     )
      // } else if (this.props.tabActive == 'id-2') {
      //     return (
      //         <SidebarDiv className="sidebar">
      //             <div>
      //                 <Divider/>
      //                 {this.heightRange()}
      //                 <SelectedTree></SelectedTree>
      //             </div>
      //             { this.props.wateredTreeDataUpdated ? <Legend/> : null }
      //         </SidebarDiv>
      //     )
      // }

}

export default connect(state => ({
  wateredTrees: wateredTreesSelector(state),
}), Actions)(Sidebar);