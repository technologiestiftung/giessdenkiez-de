import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import history from './history';
import ErrorBoundary from './ErrorBoundary';

import { Provider } from 'unistore/react';
import Store from './state/Store';
import GlobalStyles from './assets/Global';

import { Auth0Provider } from './utils/auth0';

const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

function startApp() {
  const rootElement = document.getElementById('app');

  function renderApp(RootComponent) {
    ReactDOM.render(
      <ErrorBoundary>
        <Auth0Provider
          domain={process.env.AUTH0_DOMAIN}
          client_id={process.env.AUTH0_CLIENT_ID}
          audience={process.env.AUTH0_AUDIENCE}
          redirect_uri={window.location.origin}
          onRedirectCallback={onRedirectCallback}
        >
          <Provider store={Store}>
            <>
              <GlobalStyles />
              <RootComponent />
            </>
          </Provider>
        </Auth0Provider>
      </ErrorBoundary>,
      rootElement
    );
  }

  // Mount the react-app
  renderApp(Root);
}

startApp();
