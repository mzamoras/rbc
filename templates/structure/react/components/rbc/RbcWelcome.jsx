
import React from 'react';
import injectSheet from 'react-jss'

const cssStyles = theme => ({
    container:{
        display       : 'flex',
        flexDirection : 'column',
        justifyContent: 'center',
        height        : '100%',
        backgroundColor: theme.currentStyle.bgColor
    },
    title:{ 
        color     : theme.currentStyle.primaryColor,
        fontSize  : 22,
        fontWeight: 'bold',
        textAlign : 'center'
    },
    subTitle:{
        color    : theme.currentStyle.secondaryColor,
        fontSize : 14,
        textAlign: 'center'
    },
    themeChanger:{
        position       : 'absolute',
        right          : 10,
        top            : 10,
        backgroundColor: '#CCC',
        borderRadius   : '100%',
        width          : 30,
        height         : 30,
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center',
        cursor         : 'pointer',

        '& i':{
            color: 'white'
        }
    },
    regularData:{
        color: theme.currentStyle.fontColor,
        fontSize: 13,
        textAlign: 'center'
    }
});

const WelcomeUnStyled = ( { classes, themeStyle, handleThemeChange } ) => (
    <div className={classes.container}>
        <div className={classes.title}>
            React Base Project Starter Kit
        </div>
        <div className={classes.subTitle}>
            Rendering App Component
        </div>
        <div className={classes.regularData}>
            <strong>{process.env.SERVER_URL_FULL}</strong>
        </div>
        <div className={classes.themeChanger} onClick={ handleThemeChange }>
            <i className='material-icons'>{ themeStyle === 'light' ? 'invert_colors' : 'invert_colors_off' }</i>
        </div>
        
    </div>
);

export default injectSheet(cssStyles)(WelcomeUnStyled);
