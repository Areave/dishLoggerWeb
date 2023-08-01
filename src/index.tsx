import React from 'react';
import {render as renderApp} from 'react-dom';
import App from "./app/app";
import './style/fonts.scss';
import './style/normalize.scss';
import './style/root.scss';
import {Provider} from "react-redux";
import store from "./utils/store";
import {BrowserRouter} from "react-router-dom";

renderApp(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>, document.getElementById('app'));


