import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../assets/theme';
import { Router } from 'react-router-dom';
import history from '../history';
import store from '../state/Store';

import {
  loadData,
  getWateredTrees,
  loadTrees,
  loadCommunityData,
} from '../state/Actions';
import '../assets/style.scss';

import AppWrapper from './AppWrapper';

const loadEntryDataAction = store.action(loadData(store));
const loadTreesAction = store.action(loadTrees(store));
const loadWateredTreesAction = store.action(getWateredTrees(store));
const loadCommunityDataAction = store.action(loadCommunityData(store));

loadEntryDataAction();
loadWateredTreesAction();
loadTreesAction();
loadCommunityDataAction();

const AppContainer: FC = () => (
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <AppWrapper />
    </ThemeProvider>
  </Router>
);

export default AppContainer;
