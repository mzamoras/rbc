
import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import injectSheet from 'react-jss'
import {important, midSize} from '../assets/less/components/global.less';

const cssStyles = {
    red:{ 
        color: 'red',
        fontSize: 12,
        fontWeight: 'bold'
     }
};

class App extends React.Component{

    render(){

        const cssClass = className( important, midSize );

        return(
            <div className={this.props.className}>
                This ia App Component v007
                <div className={cssClass}>React Base Components</div>
                <div className={this.props.classes.red}>
                    Using JSS
                </div>
                {this.props.children}
            </div>
        );

    }

    static propTypes = {
        className: PropTypes.string
    }
}
export default injectSheet(cssStyles)(App);