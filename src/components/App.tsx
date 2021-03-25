import { hot } from 'react-hot-loader/root';
import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme } from '../assets/theme';
import { Router } from 'react-router-dom';
import history from '../history';

import '../assets/style.scss';

import AppWrapper from './AppWrapper';

const AppContainer: FC = () => (
  <Router history={history}>
    <ThemeProvider theme={theme}>
      <AppWrapper />
    </ThemeProvider>
  </Router>
);

export default hot(AppContainer);
