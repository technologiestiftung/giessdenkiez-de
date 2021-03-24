import React, { FC, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../assets/theme';
import { Router } from 'react-router-dom';
import history from '../history';
import store from '../state/Store';

import '../assets/style.scss';

import AppWrapper from './AppWrapper';
import { useActions } from '../state/unistore-hooks';
import { loadAllData } from '../utils/requests/loadAllData';

const AppContainer: FC = () => {
  const { startLoading, stopLoading } = useActions();

  useEffect(() => {
    startLoading();
    loadAllData()
      .then(storeData => store.setState(storeData))
      .finally(() => stopLoading())
      .catch(console.error);
  }, []);

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppWrapper />
      </ThemeProvider>
    </Router>
  );
};

export default AppContainer;
