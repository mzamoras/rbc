/**
 * File: babel.conf.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import path from 'path';

export default function ( isProductionEnvironment = false, hot = true, newHot = false ) {

    const presets = [
        [require.resolve( 'babel-preset-env' ), { modules: false }/* , { 'es2015': { modules: false } } */],
        require.resolve( 'babel-preset-stage-2' ),
        require.resolve( 'babel-preset-react' ),
    ];

    const plugins = [
        require.resolve( 'babel-plugin-transform-class-properties' ),
        [require.resolve( 'babel-plugin-transform-object-rest-spread' ), { useBuiltIns: true }],
        [require.resolve( 'babel-plugin-transform-runtime' ), {
            helpers    : false,
            polyfill   : false,
            regenerator: true,
            moduleName : path.dirname( require.resolve( 'babel-runtime/package' ) )
        }],
        [require.resolve( 'babel-plugin-import' ), [
            { libraryName: "antd", style: true },
            { libraryName: "material-ui", libraryDirectory: "components", camel2DashComponentName: false }]]
    ];

    if( hot || newHot ){
        presets.push(
            require.resolve( newHot ? 'react-hot-loader/babel'  : 'babel-preset-react-hmre' )
        );
    }

    return {
        babelrc       : false,
        cacheDirectory: false,
        presets       : presets,
        plugins       : plugins
    }

}