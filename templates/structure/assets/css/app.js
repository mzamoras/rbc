/**
 * File: app.js | Package: Monoux
 * 
 * Author: Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 12 Sep, 2017 | 12:56 AM
 * 
 * This file is part of a package and all the information, intellectual
 * and technical concepts contained here are property of their owners.
 * Any kind of use, reproduction, distribution, publication, etc. without
 * express written permission from CapitalMental && BackLogics Technologies
 * is strictly forbidden.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';
import ReactDOM from 'react-dom';

const mountPoint = document.getElementById( 'appRoot' );

function render() {
    
    const Next = require( '../../react/App' )['default'];
    return ReactDOM.render( 
        <Next>
            My App
        </Next>
    , mountPoint );
}
    
render();
    
if ( module.hot ) {
    module.hot.accept( '../../react/App', () => {
        render();
    } );
}
    