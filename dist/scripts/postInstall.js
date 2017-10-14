'use strict';

var _child_process = require('child_process');

var _DataReader = require('../utilities/DataReader');

var _DataReader2 = _interopRequireDefault(_DataReader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * File: install.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

var dataReader = new _DataReader2.default();

if (!!dataReader.json.client) {

    var packName = dataReader.json.rbc.name;

    var scripts = {
        "// - - - React Base Project Starter Kit Scripts - - - //": "",
        recompile: 'rimraf ./node_modules/' + packName + '/dist && babel --presets env --plugins transform-object-rest-spread -d ./node_modules/' + packName + '/dist/ ./node_modules/' + packName + '/src/ --copy-files',
        recompileW: 'rimraf ./node_modules/' + packName + '/dist && babel --presets env --plugins transform-object-rest-spread -d ./node_modules/' + packName + '/dist/ ./node_modules/' + packName + '/src/ --copy-files -w',
        start: 'node ./node_modules/' + packName + '/dist/start.js',
        electron: 'node ./node_modules/' + packName + '/scripts/electron.js',
        storybook: 'start-storybook -p 9001 -c ./resources/storybook',
        karma: 'cross-env NODE_ENV=karma-test node ./node_modules/' + packName + '/dist/scripts/testConfig.js',
        jest: 'cross-env NODE_ENV=jest-test node ./node_modules/' + packName + '/dist/scripts/testConfig.js'
    };

    dataReader.addClientScript(null, scripts);
    dataReader.saveClientPackageJson();
} else {
    console.log('SCRIPT MEANT TO BE RUN BY CLIENT');
}