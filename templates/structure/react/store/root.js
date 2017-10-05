
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