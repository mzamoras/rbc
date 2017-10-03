
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
    