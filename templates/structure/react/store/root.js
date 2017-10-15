/**
 * File: root.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import {routerReducer} from 'react-router-redux';
import {combineReducers} from 'redux';
import demoStore from './demoStore';


const appReducer = combineReducers( { router: routerReducer, demoStore }  );

const root = ( state, action ) => {

    if ( action.type === 'RESET' ) {
        console.log( "\u2757\uFE0F\u2757\uFE0F RESETTING STORE" );
        state = { router: state.router }
    }
    return appReducer( state, action )
};

export default root;