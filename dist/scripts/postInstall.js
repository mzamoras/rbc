"use strict";

var _DataReader = _interopRequireDefault(require("../utilities/DataReader"));

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
var dataReader = new _DataReader.default();

if (!!_DataReader.default.json.client) {
  var packName = _DataReader.default.json.rbc.name;
  var nodeBin = './node_modules/.bin/'; // eslint-disable-line

  var pack = "./node_modules/".concat(packName);
  var scripts = {
    '// - - - React Base Project Starter Kit Scripts - - - //': '',
    recompile: "rimraf ".concat(pack, "/dist && babel --presets env --plugins transform-object-rest-spread -d ").concat(pack, "/dist/ ").concat(pack, "/src/ --copy-files"),
    recompileW: "rimraf ".concat(pack, "/dist && babel --presets env --plugins transform-object-rest-spread -d ").concat(pack, "/dist/ ").concat(pack, "/src/ --copy-files -w"),
    start: "node ".concat(pack, "/dist/start.js"),
    electron: "node ".concat(pack, "/scripts/electron.js"),
    storybook: "node ".concat(pack, "/scripts/storybook.js"),
    karma: "node ".concat(pack, "/scripts/karma.js "),
    karmaWatch: "node ".concat(pack, "/scripts/karma.js watch"),
    jest: "node ".concat(pack, "/scripts/jest.js "),
    jestWatch: "node ".concat(pack, "/scripts/jest.js watch")
  };
  dataReader.addClientScript(null, scripts);
  dataReader.insertInClientPackageJsonKey(null, 'rbc::eslintConfig', {
    root: true,
    globals: {},
    extends: "./node_modules/".concat(packName, "/dist/config/eslint.conf.js")
  });
  dataReader.saveClientPackageJson();
} else {
  console.log('SCRIPT MEANT TO BE RUN BY CLIENT');
}