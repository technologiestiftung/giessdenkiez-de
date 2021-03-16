import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../assets/theme';
import { Router } from 'react-router-dom';
import history from '../history';
import { connect } from 'unistore/react';
import store from '../state/Store';

import Actions, {
  loadData,
  getWateredTrees,
  loadTrees,
  loadCommunityData,
} from '../state/Actions';
import '../assets/style.scss';

import AppWrapper from './AppWrapper';
import { StoreProps } from '../common/interfaces';

type AppContainerPropsType = Pick<
  StoreProps,
  'isTreeDataLoading' | 'isTreeMapLoading' | 'data' | 'overlay'
>;

const loadEntryDataAction = store.action(loadData(store));
const loadTreesAction = store.action(loadTrees(store));
const loadWateredTreesAction = store.action(getWateredTrees(store));
const loadCommunityDataAction = store.action(loadCommunityData(store));

loadEntryDataAction();
loadWateredTreesAction();
loadTreesAction();
loadCommunityDataAction();

const AppContainer: FC<AppContainerPropsType> = () => (
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <AppWrapper />
    </ThemeProvider>
  </Router>
);

export default connect(
  state => ({
    isTreeMapLoading: state.isTreeMapLoading,
    isTreeDataLoading: state.isTreeDataLoading,
    overlay: state.overlay,
    data: state.data,
  }),
  Actions
)(AppContainer);
