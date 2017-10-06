
import React from 'react';
import {ThemeProvider} from 'react-jss'
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
            <ThemeProvider theme={ defaultTheme( this.state.themeStyle ) }>
                <RbcWelcome handleThemeChange={this.handleThemeChange} themeStyle={this.state.themeStyle}/>
            </ThemeProvider>    
        );
    }
}

export default App;