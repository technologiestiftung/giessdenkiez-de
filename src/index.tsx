import 'react-app-polyfill/stable';
import 'whatwg-fetch';
import 'core-js/stable';
import './mocks/mocks-utils'; // should be first import after polyfills
// -------------------------------------------------------------------
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'unistore/react';

import store from './state/Store';
import GlobalStyles from './assets/Global';
import { Auth0Provider } from './utils/auth/auth0';
import Root from './Root';
import ErrorBoundary from './ErrorBoundary';
import history from './history';

const onRedirectCallback = (appState?: { targetUrl?: string }): void => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <>
    <GlobalStyles />
    <ErrorBoundary>
      <Auth0Provider
        domain={process.env.AUTH0_DOMAIN}
        client_id={process.env.AUTH0_CLIENT_ID}
        audience={process.env.AUTH0_AUDIENCE}
        redirect_uri={window.location.origin}
        onRedirectCallback={onRedirectCallback}
      >
        <Provider store={store}>
          <Root />
        </Provider>
      </Auth0Provider>
    </ErrorBoundary>
  </>,

  document.getElementById('app')
);
