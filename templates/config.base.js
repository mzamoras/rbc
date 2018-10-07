/**
 * File: rbc.config.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

const path = require( 'path' );

module.exports = function( isProductionEnvironment, isHotModuleReloadEnabled ){
    
    const config = {};

    /**
     * This is the folder where the app data is stored
     */
    const mainFolder = path.resolve("./reactApp");
    
    
    /**
     * P A T H S
     * this section configures the paths across the app,
     * servers and utilities
     */
    config.paths = {

        src : mainFolder,
        dest: path.resolve(mainFolder, 'public'),
        node: path.resolve("./node_modules"),

        src_react: path.join( mainFolder, 'react' ),
        src_js   : path.join( mainFolder, 'assets/js' ),
        src_css  : path.join( mainFolder, 'assets/css' ),
        src_less : path.join( mainFolder, 'assets/less' ),
        src_media: path.join( mainFolder, 'assets/media' ),
        src_fonts: path.join( mainFolder, 'assets/fonts' ),

        //The path where the tsconfig file should be placed
        src_tsconfig: null,
        src_tslint  : null
    };

    config.base = {
        projectName      : "%PROJECT_NAME%",
        notificationsIcon: null,
        localURL         : "%LOCAL_ADDRESS%",
        //USE_PROXY//proxyURL        : "%PROXY_ADDRESS%",
        allowCrossOrigin: !isProductionEnvironment,
        useStaticHTML   : true,//USE_STATIC//,
        autoOpenChrome  : false,//OPEN_CHROME//,

        sslCert         : {
            key : path.join( require('os').homedir(), '.localhost-ssl/localNetworkDev.key' ),
            cert: path.join( require('os').homedir(), '.localhost-ssl/localNetworkDev.crt' ),
        }
    };
    
    config.wp ={
        
        entry:{

            /**
             * This base file is a compilation of global variables
             * and utilities needed across the app, and will be available
             * and required before the actual app, also includes the 
             * pollyfills needed
             */
            base: [
                'babel-polyfill',
                path.join(config.paths.src_js,"base.js")
            ],
            /**
             * The actual app's main file, this is the file that
             * attaches the App component to the dom
             */
            app:[
                path.join(config.paths.src_js,"app.js")
            ]
        },

        output:{
            filename     : "js/[name].js",
            chunkFilename: "js/[name].js"
        },

        resolve:{
            extensions: [ ".js", ".jsx", ".json", ".ts", ".tsx" ]
        },

        vendorsInSameChunk: [
            /*
            /moment/,
            /scrollbars/,
            /react-color/,
            */
        ],
        eslintUsage:{
            useEslintrc: false,
        },

        target: 'electron-renderer'

    };

    config.storyBook = {
        path: path.join( mainFolder, 'storybook' ),
        port: 9001
    }

    config.tests = {
        path: path.join( mainFolder, 'react/tests' ),
        karmaIndex: path.join( mainFolder, 'react/tests/configuration/karma.index.js' ),
        jestIndex: path.join( mainFolder, 'react/tests/configuration/jest.index.js' ),
    }

    return config;
}