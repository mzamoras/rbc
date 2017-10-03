/**
 * File: preInstall.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

 const path   = require('path');
 const fse    = require('fs-extra');
 const {exec} = require('child_process');

 const rbcPath        = path.resolve( __dirname, "../" );
 const clientPath     = path.resolve( rbcPath, "../../" );
 const rbcJSON        = path.resolve( rbcPath, "package.json" );
 const clientJSON     = path.resolve( clientPath, 'package.json' );
 const rbcJSONData    = fse.readJsonSync( rbcJSON, { throws: false } );
 const clientJSONData = fse.readJsonSync( clientJSON, { throws: false } ) || null;

if(clientJSONData){
    exec('npm run compile');
}
else{
    console.log( 'COMPILE IS ONLY FOR CLIENT SCRIPT' );
}
 

