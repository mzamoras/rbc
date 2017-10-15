/**
 * File: RbcWelcome.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';
import withStyles from 'material-ui/styles/withStyles';

const cssStyles = theme =>{
    
    const currentStyle  = theme.currentStyle || {};

    return {
        container:{
            display       : 'flex',
            flexDirection : 'column',
            justifyContent: 'center',
            height        : '100%',
            backgroundColor: currentStyle.bgColor
        },
        title:{ 
            color     : currentStyle.primaryColor,
            fontSize  : 22,
            fontWeight: 'bold',
            textAlign : 'center'
        },
        subTitle:{
            color    : currentStyle.secondaryColor,
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
            color: currentStyle.fontColor,
            fontSize: 13,
            textAlign: 'center'
        }
    }
};

const WelcomeUnStyled = ( { classes, themeStyle, handleThemeChange } ) => (
    <div className={classes.container}>
        <div className={classes.title}>
            React Base Project Starter Kit
        </div>
        <div className={classes.subTitle}>
            Rendering App Component
        </div>
        <div className={classes.regularData}>
            <strong>{process.env.SERVER_URL_FULL || 'no server was given'}</strong>
        </div>
        <div className={classes.themeChanger} onClick={ handleThemeChange }>
            <i className='material-icons'>{ themeStyle === 'light' ? 'invert_colors' : 'invert_colors_off' }</i>
        </div>
        
    </div>
);

export default withStyles(cssStyles)(WelcomeUnStyled);
