/**
 * File: testConfig.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

 import path from 'path';
 import DataReader from '../utilities/DataReader';
 import { spawnSync } from 'child_process';

 const KARMA    = 'Karma';
 const JEST     = 'Jest';
 const UNKNOWN  = 'Unknown';
 const NODE_ENV = process.env.NODE_ENV;
 const TEST     = NODE_ENV === 'jest-test' ? JEST : NODE_ENV === 'karma-test' ? KARMA : UNKNOWN;

 const dataReader = new DataReader();
 
 const configData = dataReader.config;
 const packName   = dataReader.json.rbc.name;
 const pack       = `./node_modules/${packName}`;
 const nodeBin    = './node_modules/.bin/';



 if( !!dataReader.config){
    
    let selectedTest = '';
    const testDir    = path.resolve( configData.paths.src_react, 'tests/configuration/jest.index.js' );

    if( TEST === KARMA ){
        selectedTest = 'rbc::karma';
        dataReader.addClientScript( 'karma', `cross-env NODE_ENV=karma-test babel-node --presets env -- ${nodeBin}karma start ${pack}/dist/config/karma.config.js` );
        dataReader.addClientScript( 'karmaWatch', `cross-env NODE_ENV=karma-test babel-node --presets env -- ${nodeBin}karma start ${pack}/dist/config/karma.config.js --watchAll` );
    }
    else if( TEST === JEST ){
        selectedTest = 'rbc::jest';
        dataReader.addClientScript( 'jest', `jest --config ${testDir} --no-cache` );
        dataReader.addClientScript( 'jestWatch', `jest --config ${testDir} --no-cache --watchAll` );
    }

    dataReader.saveClientPackageJson();

    spawnSync('npm',[
        'run',
        selectedTest
    ], { stdio:'inherit' });

 }
 else{
    console.log('Run the main script first, to make your configurations');
 }


