
import update from 'immutability-helper';


const UPDATE_THEME_STYLE = 'UPDATE_THEME_STYLE';

const initialState = {
    theme     : "default",
    themeStyle: "light"
}

export default function reducer( state = initialState, action = {} ) {

    Object.freeze( state );
    
        switch ( action.type ) {
            case UPDATE_THEME_STYLE:
                return update( state, {
                    themeStyle: { $set: action.data.newStyle }
                });
            default:
                return state;
        }
};

export const demoStore_actions = {};

demoStore_actions.changeThemeStyle = function( type = UPDATE_THEME_STYLE, style ){
    return { type, data: {
        newStyle: style
    } };
}