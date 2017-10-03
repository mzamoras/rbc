/**
 * File: browserSyncDuplicates.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

(function browserSyncLoader( win, doc ) {
    
    console.log( "[Browsersync] checking for script existence..." );

    if(!!doc.getElementById( '__electron__' )){
        doc.write(`<script async id="__bs_script__" src="${process.env.SERVER_URL_FULL}/browser-sync/browser-sync-client.js?v=${process.env.BS_VER}"></script>`)
        console.log( "[Browsersync] Electron Script inserted successfully!!!" );
        return;
    }

    if ( !win || !doc ) return;
    const currentScript = doc.getElementById( '__bs_script__' );

    if ( !currentScript && process.env.BS_VER && process.env.SERVER_PORT ) {
        doc.write( "<script async src='" + `//localhost:${process.env.SERVER_PORT}/browser-sync/browser-sync-client.js?v=${process.env.BS_VER}` + "'><\/script>" );
        console.log( "[Browsersync] Script inserted successfully! [ browser-sync-client." + process.env.BS_VER + " ]" );
        return;
    }
    console.log( "[Browsersync] Script is already inserted!" );
})( window, document );