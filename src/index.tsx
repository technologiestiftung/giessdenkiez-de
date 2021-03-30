import 'react-hot-loader';
import 'react-app-polyfill/stable';
import 'whatwg-fetch';
import 'core-js/stable';
import './mocks/mocks-utils'; // should be first import after polyfills
// -------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { Providers } from './Providers';
import GlobalStyles from './assets/Global';
import App from './components/App';

ReactDOM.render(
  <>
    <GlobalStyles />
    <Providers>
      <App />
    </Providers>
  </>,

  document.getElementById('app')
);
