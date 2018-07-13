/*
 * File: jest.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */


const path          = require('path');
const { spawnSync } = require('child_process');
const chalk         = require('chalk');
const args          = process.argv.slice(2);
const spacing       = "                ";

let config = null;
let cont   = false;

try {
    config = require('../../../rbc.config.js')(false,false);
    cont   = true;
} catch (error) {
    console.log(
        "+-------------------------------------------------------+\n" +
        chalk.dim("|",spacing) + chalk.cyan.bold("REACT BASE COMPONENTS") + chalk.dim(spacing,"|") + "\n" +
        "+-------------------------------------------------------+\n\n" + 
        chalk.bold("WARNING: ") + "please run \"npm run rbc::start\" first\n"
    );

}

if( cont ){
    executeScript();
}

function executeScript(){

    const nodeBin    = './node_modules/.bin/';  
    const scr =   [
        nodeBin + "cross-env",
        "NODE_ENV=karma-test",
        "babel-node",
        "--presets",
        "env",
        "--",
        nodeBin + "jest",
        "--config",
        config.tests.jestIndex,
        "--no-cache",
    ];

    if( args[0] === "watch" ){
        scr.push( "--watchAll" );
    }

    spawnSync("node",scr,{ maxBuffer: 1024 * 1024, stdio:'inherit' });
}