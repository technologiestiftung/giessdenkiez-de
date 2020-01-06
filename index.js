import React from 'react';
import ReactDOM from 'react-dom';
import Root from './src/Root';

import { Provider } from 'unistore/react';
import Store from './src/state/Store';

function startApp() {
    const rootElement = document.getElementById('app');

    function renderApp(RootComponent) {
        ReactDOM.render(
            <Provider store={Store}>
                <RootComponent/>
            </Provider>
            ,rootElement);
    }

    // Mount the react-app
    renderApp(Root);
}

startApp();
