/**
 * File: default.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export default function( style = "light" ){
    const theme =  {
        style,
        primaryColor  : "#CC0000",
        secondaryColor: "#00DD00",
        themeStyle    : {
            light:{
                bgColor       : "#F2F2F2",
                fontColor     : "#444444",
                primaryColor  : "rgba(194,24,91 ,1)",
                secondaryColor: "rgba(2,119,189 ,1)"
            },
            dark:{
                bgColor       : "rgba(38,50,56 ,1)",
                fontColor     : "#CCC",
                primaryColor  : "rgba(240,98,146 ,1)",
                secondaryColor: "rgba(3,169,244 ,1)"
            }
        },
        currentStyle:{}
    };

    theme.currentStyle = theme.themeStyle[style];

    return createMuiTheme(theme);
}