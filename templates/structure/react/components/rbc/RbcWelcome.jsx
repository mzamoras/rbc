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
import withStyles from '@material-ui/core/styles/withStyles';
import { asyncComponent } from 'react-async-component'
import Button from '@material-ui/core/Button';
import TypeScriptComponent from './TypeScriptComponent';
import lessImported from '../../../assets/less/app.less';
import scssImported from '../../../assets/sass/app.scss';


const LoadableComponent = asyncComponent({
    resolve: ()=> import('./LoadableComponent' /* webpackChunkName:"loadable" */),
    LoadingComponent: () => (
        <div> * * L o a d i n g * * </div>
    )
});

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
        },

        buttonContainer:{
            textAlign: 'center',
            '& button':{
                display:'inline-block',
                fontSize: 11
            }
        }
    }
};

class WelcomeUnStyled extends React.Component{
    something = 'x';
    constructor( props ){
        super( props );
        this.state = {
            loading: false
        };
        this.onLoadComponent = this.onLoadComponent.bind(this);
    }

    onLoadComponent(){
        this.setState({ loading: true });
    }

    render(){
        const { classes, themeStyle, handleThemeChange } = this.props;
        return (
            <div className={classes.container}>
                <div className={classes.title}>
                    React Base Project Starter Kit 2.0
                </div>
                <div className={classes.subTitle}>
                    Rendering App Component {this.something}
                    <div className="styledComponentsContainer">
                        <div className={lessImported.simpleButton}>
                            <div>Element styled from a file of type:</div>
                            <div><b>LESS</b></div>
                        </div>
                        <div className={scssImported.buttonSCSS}>
                            <div>Element styled from a file of type:</div>
                            <div><b>SASS</b></div>
                        </div>
                        <div className="fromCssFile">
                            <div>Element styled from a file of type:</div>
                            <div><b>CSS</b></div>
                        </div>
                    </div>
                </div>
                <div className={classes.regularData}>
                    <strong>{process.env.SERVER_URL_FULL || 'no server was given'}</strong>
                </div>
                <div className={classes.themeChanger} onClick={ handleThemeChange }>
                    <i className='material-icons'>{ themeStyle === 'light' ? 'invert_colors' : 'invert_colors_off' }</i>
                </div>
                <TypeScriptComponent/>
                <div className={classes.buttonContainer} >
                    <Button variant="contained" size="small" disabled={this.state.loading} color="secondary" className={classes.button} onClick={this.onLoadComponent}>
                        Load Component Asynchronous
                    </Button>
                </div>

                { this.state.loading && <LoadableComponent/> }
            </div>
        );
    }
}

export default withStyles(cssStyles)(WelcomeUnStyled);