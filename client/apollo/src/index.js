import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import Home from './containers/home/index.jsx';
import { ApolloProvider, ApolloClient, compose } from 'react-apollo';
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import { composeWithDevTools } from 'redux-devtools-extension';
import mainReducer, {client} from './reducers';

const routeMiddleware = routerMiddleware(browserHistory);

global.harshScore = {
    promotions: 0,
    demotions: 0,
    harshness: 0,
    update: () => {
        if(harshScore.promotions != 0) {
            harshScore.harshness = harshScore.demotions / (harshScore.demotions + harshScore.promotions);
        } else {
            if(harshScore.demotions > 0) {
                harshScore.harshness = 1;
            }
        }
    }
};
const harshMiddleware = store => next => action => {
    if(action.type === 'PERSON_DEMOTED'){
        harshScore.demotions++;
        harshScore.update();
    }

    if(action.type === 'PERSON_PROMOTED'){
        harshScore.promotions++;
        harshScore.update();
    }

    if(action.type !== 'custom') return next(action)
}


const store = createStore(
    mainReducer,
    {},
    compose(
        applyMiddleware(routeMiddleware, client.middleware(), harshMiddleware),
        /*
        (typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
        */
        // window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(
        //     applyMiddleware(client.middleware())
        // )
        // applyMiddleware(client.middleware()),
        window.devToolsExtension ? window.devToolsExtension() : f => f,
    )
);

const history = syncHistoryWithStore(browserHistory, store);

require('./style.scss');

ReactDOM.render(
    <ApolloProvider store={store} client={client}>
        <Router history={history}>
            <Route path="/" component={Home}></Route>
        </Router>
    </ApolloProvider>,
    document.querySelector('#root'));

