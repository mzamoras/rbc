/**
 * File: App.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import defaultTheme from './themes/default';
import '../assets/less/app.less';

//Replace with your component
import RbcWelcome from './components/rbc/RbcWelcome';

class App extends React.Component{

    constructor( props ){
        super( props );
        this.state = {
            themeStyle: "light"
        }
        this.handleThemeChange = this.handleThemeChange.bind(this);
    }

    handleThemeChange(){
        this.setState({ 
            themeStyle: this.state.themeStyle === 'light' ? 'dark' : 'light' 
        });
    }

    render(){    
        return(
            <MuiThemeProvider theme={ defaultTheme( this.state.themeStyle ) }>
                <RbcWelcome handleThemeChange={this.handleThemeChange} themeStyle={this.state.themeStyle}/>
            </MuiThemeProvider>    
        );
    }
}

export default App;