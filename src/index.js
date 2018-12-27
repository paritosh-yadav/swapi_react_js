import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger';
import rootReducer from './redux/';

import './index.css';
import LoginContainer from "./views/login/login";
import LandingPageContainer from './views/landing-page/LandingPageContainer';
import * as serviceWorker from './serviceWorker';

const store = createStore(rootReducer, applyMiddleware(thunk, createLogger()));

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route path="/" exact component={LoginContainer} />
                <Route path="/landing/" component={LandingPageContainer} />
            </div>
        </Router>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
