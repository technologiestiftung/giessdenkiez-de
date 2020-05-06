import React from 'react';
import ReactDOM from 'react-dom';
import Root from './src/Root';

import history from './history';

import { Provider } from 'unistore/react';
import Store from './src/state/Store';
import GlobalStyles from './src/assets/Global';

import { Auth0Provider } from './src/utils/auth0';

const onRedirectCallback = appState => {
  console.log(appState);
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

require('file-loader?name=[name].[ext]!./index.html');

function startApp() {
  const rootElement = document.getElementById('app');

  function renderApp(RootComponent) {
    ReactDOM.render(
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
      </Auth0Provider>,
      rootElement
    );
  }

  // Mount the react-app
  renderApp(Root);
}

startApp();
