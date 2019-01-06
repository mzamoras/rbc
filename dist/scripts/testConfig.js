"use strict";

var _path = _interopRequireDefault(require("path"));

var _DataReader = _interopRequireDefault(require("../utilities/DataReader"));

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * File: testConfig.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */
var KARMA = 'Karma';
var JEST = 'Jest';
var UNKNOWN = 'Unknown';
var NODE_ENV = process.env.NODE_ENV;
var TEST = NODE_ENV === 'jest-test' ? JEST : NODE_ENV === 'karma-test' ? KARMA : UNKNOWN;
var dataReader = new _DataReader.default();
var configData = dataReader.config;
var packName = dataReader.json.rbc.name;
var pack = "./node_modules/".concat(packName);
var nodeBin = './node_modules/.bin/';

if (!!dataReader.config) {
  var selectedTest = '';

  var testDir = _path.default.resolve(configData.paths.src_react, 'tests/configuration/jest.index.js');

  if (TEST === KARMA) {
    selectedTest = 'rbc::karma';
    dataReader.addClientScript('karma', "cross-env NODE_ENV=karma-test babel-node --presets env -- ".concat(nodeBin, "karma start ").concat(pack, "/dist/config/karma.config.js"));
    dataReader.addClientScript('karmaWatch', "cross-env NODE_ENV=karma-test babel-node --presets env -- ".concat(nodeBin, "karma start ").concat(pack, "/dist/config/karma.config.js --watchAll"));
  } else if (TEST === JEST) {
    selectedTest = 'rbc::jest';
    dataReader.addClientScript('jest', "jest --config ".concat(testDir, " --no-cache"));
    dataReader.addClientScript('jestWatch', "jest --config ".concat(testDir, " --no-cache --watchAll"));
  }

  dataReader.saveClientPackageJson();
  (0, _child_process.spawnSync)('npm', ['run', selectedTest], {
    stdio: 'inherit'
  });
} else {
  console.log('Run the main script first, to make your configurations');
}