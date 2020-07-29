import 'react-app-polyfill/stable';
import 'whatwg-fetch';
import 'core-js';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './Root';

import history from './history';
import ErrorBoundary from './ErrorBoundary';

import { Provider } from 'unistore/react';
import store from './state/Store';
import GlobalStyles from './assets/Global';

import { Auth0Provider } from './utils/auth0';
import { FakeAuth0Provider } from './dev-mode/fake-auth0';
let devMode = false;
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};
function startApp(): void {
  const url: URL = new URL(window.location.href);
  const params: URLSearchParams = url.searchParams;

  console.log(params);
  if (params.has('mode')) {
    const mode = params.get('mode');
    if (mode === 'DEV_MODE') {
      devMode = true;
      console.log('WE ARE IN DEV_MODE!!!!!');
    }
  }
  const rootElement = document.getElementById('app');

  function renderApp(RootComponent: () => JSX.Element): void {
    ReactDOM.render(
      <ErrorBoundary>
        {devMode === false ? (
          <Auth0Provider
            domain={process.env.AUTH0_DOMAIN}
            client_id={process.env.AUTH0_CLIENT_ID}
            audience={process.env.AUTH0_AUDIENCE}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
          >
            <Provider store={store}>
              <>
                <GlobalStyles />
                <RootComponent />
              </>
            </Provider>
          </Auth0Provider>
        ) : (
          <FakeAuth0Provider
            domain={process.env.AUTH0_DOMAIN}
            client_id={process.env.AUTH0_CLIENT_ID}
            audience={process.env.AUTH0_AUDIENCE}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
          >
            <Provider store={store}>
              <>
                <GlobalStyles />
                <RootComponent />
              </>
            </Provider>
          </FakeAuth0Provider>
        )}
      </ErrorBoundary>,
      rootElement
    );
  }

  // Mount the react-app
  renderApp(Root);
}

startApp();
