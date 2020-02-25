import React from 'react';
import ReactDOM from 'react-dom';
import Root from './src/Root';

import history from "./history";
import config from "./auth0_config.json";

import { Provider } from 'unistore/react';
import Store from './src/state/Store';
import GlobalStyles from './src/assets/Global';

import { Auth0Provider } from "./src/utils/auth0";

const onRedirectCallback = appState => {
  console.log(appState)
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
          <Auth0Provider
            domain={config.domain}
            client_id={config.clientId}
            audience={config.audience}
            redirect_uri={window.location.origin}
            onRedirectCallback={onRedirectCallback}
          >
            <Provider store={Store}>
              <>
                <GlobalStyles />
                <RootComponent/>
              </>
            </Provider>
          </Auth0Provider>
        ,rootElement);
    }

    // Mount the react-app
    renderApp(Root);
}

startApp();
