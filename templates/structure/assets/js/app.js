/**
 * File: app.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import config, {getStoreHistory} from '../../react/store/config';

const mountPoint = document.getElementById( 'appRoot' );
const reduxStore = config();
const history    = getStoreHistory();

function render() {
    
    const Next = require( '../../react/App' )['default'];
    return ReactDOM.render( 
        <Provider store={reduxStore} >
            <ConnectedRouter history={history}>
                <Next/>
            </ConnectedRouter>
        </Provider>, mountPoint );
}
    
render();
    
if ( module.hot ) {
    module.hot.accept( '../../react/App', () => {
        render();
    } );
}