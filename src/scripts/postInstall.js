/**
 * File: install.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import fse from "fs-extra";
import path from 'path';
import { exec } from 'child_process';

const rbcPath        = path.resolve( __dirname, "../../" );
const clientPath     = path.resolve( rbcPath, "../../../" );
const rbcJSON        = path.resolve( rbcPath, "package.json" );
const clientJSON     = path.resolve( clientPath, 'package.json' );
const rbcJSONData    = fse.readJsonSync( rbcJSON, { throws: false } );
const clientJSONData = fse.readJsonSync( clientJSON, { throws: false } ) || null;

const newData  = clientJSONData ? clientJSONData : {};
const packName = rbcJSONData.name;
const prefix   = "rbc::";

const scripts ={
    recompile : `rimraf ./node_modules/${packName}/dist && babel --presets env --plugins transform-object-rest-spread -d ./node_modules/${packName}/dist/ ./node_modules/${packName}/src/ --copy-files`,
    recompileW: `rimraf ./node_modules/${packName}/dist && babel --presets env --plugins transform-object-rest-spread -d ./node_modules/${packName}/dist/ ./node_modules/${packName}/src/ --copy-files -w`,
    start     : `node ./node_modules/${packName}/dist/start.js`,
    _start    : `rbc-start`,
    electron  : `node ./node_modules/${packName}/scripts/electron.js`,
};

newData.scripts    = newData.scripts || {};
newData.configDate = new Date();

for (var key in scripts) {
    if (scripts.hasOwnProperty(key)) {
        newData.scripts[`${prefix}${key}`] = scripts[key];
    }
}

if( clientJSONData ){
    fse.writeJSONSync( clientJSON, newData, { spaces: 4 } );
}
else{
    console.log( 'SCRIPT MEANT TO BE RUN BY CLIENT' );
}
