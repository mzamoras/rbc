/**
 * File: root.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import {connectRouter} from 'connected-react-router';
import {combineReducers} from 'redux';
import demoStore from './demoStore';


const appReducer = history => combineReducers( { router: connectRouter(history), demoStore }  );

const root = history =>{
    return ( state, action ) => {

        if ( action.type === 'RESET' ) {
            console.log( '\u2757\uFE0F\u2757\uFE0F RESETTING STORE' );
            state = { router: state.router }
        }
        return appReducer(history)( state, action )
    }
};

export default root;