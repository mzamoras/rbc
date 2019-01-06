/*
 * File: LoadableComponent.jsx | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

const localStyles = theme =>{

    const currentStyle  = theme.currentStyle || {};

    return {
        base:{
            color    : currentStyle.secondaryColor,
            fontSize : 14,
            textAlign: 'center',
            fontWeight: 'bold'
        }
    }
};

class UnStyledLoadableComponent extends React.Component{
    render(){
        return(
           <div className={this.props.classes.base}>
               :: Loadable Component ::
           </div>
        )
    }
}

export default withStyles( localStyles )( UnStyledLoadableComponent );

