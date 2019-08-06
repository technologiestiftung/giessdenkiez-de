import React from 'react';
import ReactDOM from 'react-dom';
import Root from './src/Root';

import { Provider } from "react-redux";
import store from './src/store/index.js';

// import FormContainer from "./js/components/container/FormContainer.jsx";

// import { setTime } from './store/actions/index.js';

// window.store = store;
// window.setTime = setTime;


function startApp() {
    const rootElement = document.getElementById('app');

    function renderApp(RootComponent) {
        ReactDOM.render(
            <Provider store={store}>
                <RootComponent/>    
            </Provider>
            ,rootElement);
    }

    // Mount the react-app
    renderApp(Root);
}

startApp();
