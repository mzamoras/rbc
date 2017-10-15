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
import {ConnectedRouter} from 'react-router-redux';
import config, {getStoreHistory} from '../../react/store/config';

// Plugin to handle tap on mobile devices, should only be inserted once,
// so this is the place to do it.
//import injectTapEventPlugin from 'react-tap-event-plugin';
//injectTapEventPlugin();

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