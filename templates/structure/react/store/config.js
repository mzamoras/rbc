/**
 * File: config.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import root from './root';

const isDev      = process.env.NODE_ENV !== 'production';
const devTools   = window['__REDUX_DEVTOOLS_EXTENSION__'] && isDev ? window['__REDUX_DEVTOOLS_EXTENSION__']() : f => f;
const history    = createBrowserHistory();
const middleware = [thunk, routerMiddleware(history)];


if ( isDev ) {
    const createLogger = require( 'redux-logger' ).createLogger;
    middleware.push( createLogger( {
        collapsed: true
    } ) );
}

export function getStoreHistory(){
    return history;
}

export default function configureStore( initialState ) {
    const store = createStore(
        root(history),
        initialState,
        compose(
            applyMiddleware( ...middleware ),
            devTools
        )
    );

    if ( module['hot'] ) {

        module['hot'].accept( './root', () => {
            const nextReducer = require( './root' )['default'];
            store.replaceReducer( nextReducer );
        } );

    }

    return store;
}