import React from 'react';
// import { connect } from "react-redux";
import styled, { ThemeProvider } from 'styled-components';
import theme from '../assets/theme';
// import axios from 'axios';

import DeckGlMap from './map/index.js';
import Sidebar from './Sidebar/index.js';

import Loading from './Loading/index.js';
import png from '../assets/citylab-logo.png';

import { connect } from 'unistore/react';
import Store from '../state/Store';

import Actions, { loadData, getWateredTrees } from '../state/Actions';
import "../assets/style.scss";

const loadEntryDataAction = Store.action(loadData(Store));
const loadWateredTreesAction = Store.action(getWateredTrees(Store));

loadEntryDataAction();
loadWateredTreesAction();

const AppWrapperDiv = styled.div`
  font-family: ${props => props.theme.fontFamily};
`;

const TsbLinkDiv = styled.div`
  position: absolute;
  z-index: 1;
  top: 30px;
  left: 30px;

  a {
      display: flex;
      flex-direction: column;
      text-decoration: none;
      color: black;
      font-weight: bold;
  }
`;

const LogoImg = styled.img`
  margin-top: 10px;
  width: 160px;
`;


class AppContainer extends React.Component {
  constructor(props) {
      super(props);
  }

  componentDidMount() {
    loadData();
    getWateredTrees();
  }

  componentDidUpdate() {
    // const { wateredTrees, includedTrees, setWateredTreesFetched } = this.props;
    // const { status, data } = wateredTrees.datum;

    // if (status === 'SUCCESS' && includedTrees) {
    //   setWateredTreesFetched(true);
    // }
  }

  TSBLink() {
      if (this.props.dataLoaded && this.props.wateredTreesFetched) {
          return <TsbLinkDiv className="link">
              <a href="https://citylab-berlin.org">
                  <LogoImg src={png}></LogoImg>
              </a>
          </TsbLinkDiv>;
      }
  }

  render() {
    const { isLoading, data } = this.props;
    return (
      <ThemeProvider theme={theme}>
          <AppWrapperDiv>
              {isLoading && (<Loading/>)}
              <div>
                  {this.TSBLink()}
                  {!isLoading && data && (<DeckGlMap data={data}/>)}
                  {/* <Sidebar
                      selectedTree={this.props.selectedTree}
                  />
                  <DeckGlMap/> */}
              </div>
          </AppWrapperDiv>
      </ThemeProvider>
    )
  }
}

export default connect(state => ({
//   wateredTrees: state.wateredTrees,
//   includedTrees: state.includedTrees,
//   wateredTreesFetched: state.wateredTreesFetched,

  isLoading: state.isLoading,
  data: state.data

}), Actions)(AppContainer);