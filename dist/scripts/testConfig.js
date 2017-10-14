'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _DataReader = require('../utilities/DataReader');

var _DataReader2 = _interopRequireDefault(_DataReader);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KARMA = 'Karma'; /**
                      * File: testConfig.js | Package: React Base Starter Project
                      * 
                      * This source code is licensed under the MIT license found in the
                      * LICENSE file in the root directory of this source tree
                      * 
                      * CapitalMental && BackLogics Technologies
                      * Copyright 2014-present. | All rights reserved.
                      */

var JEST = 'Jest';
var UNKNOWN = 'Unknown';
var NODE_ENV = process.env.NODE_ENV;
var TEST = NODE_ENV === 'jest-test' ? JEST : NODE_ENV === 'karma-test' ? KARMA : UNKNOWN;

var dataReader = new _DataReader2.default();

var configData = dataReader.config;
var packName = dataReader.json.rbc.name;
var pack = './node_modules/' + packName;
var nodeBin = './node_modules/.bin/';

if (!!dataReader.config) {

    var selectedTest = '';
    var testDir = _path2.default.resolve(configData.paths.src_react, 'tests/configuration/jest.index.js');

    if (TEST === KARMA) {
        selectedTest = "rbc::karma";
        dataReader.addClientScript('karma', 'cross-env NODE_ENV=karma-test babel-node --presets env -- ' + nodeBin + 'karma start ' + pack + '/dist/config/karma.config.js');
    } else if (TEST === JEST) {
        selectedTest = "rbc::jest";
        dataReader.addClientScript('jest', 'cross-env NODE_ENV=jest-test jest --config ' + testDir + ' || true');
    }

    dataReader.saveClientPackageJson();

    (0, _child_process.spawnSync)("npm", ['run', selectedTest], { stdio: 'inherit' });
} else {
    console.log("Run the main script first, to make your configurations");
}