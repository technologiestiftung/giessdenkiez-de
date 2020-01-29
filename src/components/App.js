import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../assets/theme';
import { Router } from "react-router-dom";
import history from "../../history";
import { connect } from 'unistore/react';
import Store from '../state/Store';

import Actions, { loadData, getWateredTrees } from '../state/Actions';
import "../assets/style.scss";

import AppWrapper from './AppWrapper';

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

const TSBLink = () => {
  return <TsbLinkDiv className="link">
    <a href="https://citylab-berlin.org">
      <LogoImg src={logo}></LogoImg>
    </a>
  </TsbLinkDiv>;
}

const AppContainer = p => {

  const { isLoading, data } = p;

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppWrapper isLoading={isLoading} data={data} />
      </ThemeProvider>
    </Router>
  )

}

export default connect(state => ({
isLoading: state.isLoading,
data: state.data,
}), Actions)(AppContainer);