import React, { FC, useEffect } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../assets/theme';
import { Router } from 'react-router-dom';
import history from '../history';
import store from '../state/Store';

import '../assets/style.scss';

import AppWrapper from './AppWrapper';
import { useActions } from '../state/unistore-hooks';
import Actions from '../state/Actions';
import { loadAllData } from '../utils/requests/loadAllData';
import { getUserData } from '../utils/requests/getUserData';
import { useAuth0 } from '../utils/auth/auth0';

const AppContainer: FC = () => {
  const { startLoading, stopLoading } = useActions(Actions);
  const { isAuthenticated, getTokenSilently, user } = useAuth0();

  useEffect(() => {
    startLoading();
    loadAllData()
      .then(storeData => store.setState(storeData))
      .finally(() => stopLoading())
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    getTokenSilently()
      .then((token: string) => getUserData({ userId: user.sub, token }))
      .then(store.setState)
      .catch(console.error);
  }, [isAuthenticated, user, getTokenSilently]);

  return (
    <Router history={history}>
      <ThemeProvider theme={theme}>
        <AppWrapper />
      </ThemeProvider>
    </Router>
  );
};

export default AppContainer;
