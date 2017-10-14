/**
 * File: bs.config.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import getURLData from '../utilities/getURLData.js';

/* export default function(){
    console.log("BS CONFIG");
} */

export default function( isProductionEnvironment, hot, custom, gziped, bundle ){

    const hasProxy         = !!custom.base.proxyURL;
    const isStatic         = custom.base.useStaticHTML || (hasProxy ? false :  true);
    const allowCrossOrigin = custom.base.allowCrossOrigin;

    const serverLocalURL = getURLData( custom.base.localURL );
    const serverProxyURL = hasProxy ? getURLData( custom.base.proxyURL ) : null;

    const mainPort   = parseInt( serverLocalURL.port, 10 );
    const uiPort     = mainPort -1;
    const socketPort = !!custom.base.proxyURL ? mainPort -2 : mainPort;

    const mainFolderName     = path.basename( custom.paths.src );
    const destFolderName     = path.basename( custom.paths.dest );
    const publicPathRelative = path.relative( process.cwd(), custom.paths.dest );

    const config = {

        port           : mainPort,
        ui             : { port: uiPort},
        browser        : "google chrome",
        reloadOnRestart: true,
        injectChanges  : true,
        open           : custom.base.autoOpenChrome,
        ghostMode      : false,
        cors           : allowCrossOrigin,
        logSnippet     : true,


        /**
         * Space to Add SSL Certificates ( self signed are most common )
         */
        ... ( custom.base.sslCert && {
            https: custom.base.sslCert
        } ),

        /**
         * Server config is needed when a static content
         * is used
         */
        ...( isStatic && 
            {
                server: {
                    baseDir: `${publicPathRelative}`,
                    index  : "index.html"
                }
            } 
        ),

        /**
         * Proxy config is needed when content is served by
         * a proxy server
         */
        ...( !isStatic && 
            {
                proxy: {
                    target: serverProxyURL.simple,
                    ws    : true,
                    
                    proxyOptions: {
                        xfwd: true,
                    }
                }
            } 
        ),

        socket:{
            port: socketPort,
            domain: `${serverLocalURL.simple}:${socketPort}`
        },

        middleware: [
            webpackDevMiddleware( bundle, {
                publicPath: serverLocalURL.full + "/",
                quiet     : false,
                noInfo    : false,
                stats     : {  colors: true, chunks: false, modules:false, children:false, hash:false }
            } ),
            webpackHotMiddleware( bundle ),
            function ( req, res, next ) {

                if( custom.base.allowCrossOrigin ){
                    res.setHeader( 'Access-Control-Allow-Origin', '*' );
                }

                if( !isStatic ){
                    res.setHeader( 'Content-Type', 'text/event-stream;charset=utf-8' );
                }

                res.setHeader( 'Cache-Control', 'no-cache, no-transform' );
                res.setHeader( 'Connection', 'keep-alive' );
                next();
            }
        ],

        files    : [
            `${publicPathRelative}/*.html`,
            `${publicPathRelative}/**/*.html`,
            `${publicPathRelative}/css/**/*.css`,
            `${publicPathRelative}/vendor/**/*.css`,
        ]

    }

    return config;

}