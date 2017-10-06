'use strict';

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rbcPath = _path2.default.resolve(__dirname, "../../"); /**
                                                            * File: install.js | Package: React Base Starter Project
                                                            * 
                                                            * This source code is licensed under the MIT license found in the
                                                            * LICENSE file in the root directory of this source tree
                                                            * 
                                                            * CapitalMental && BackLogics Technologies
                                                            * Copyright 2014-present. | All rights reserved.
                                                            */

var clientPath = _path2.default.resolve(rbcPath, "../../");
var rbcJSON = _path2.default.resolve(rbcPath, "package.json");
var clientJSON = _path2.default.resolve(clientPath, 'package.json');
var rbcJSONData = _fsExtra2.default.readJsonSync(rbcJSON, { throws: false });
var clientJSONData = _fsExtra2.default.readJsonSync(clientJSON, { throws: false }) || null;

var newData = clientJSONData ? clientJSONData : {};
var packName = rbcJSONData.name;
var prefix = "rbc::";

var scripts = {
    "// - - - React Base Project Starter Kit Scripts - - - //": "",
    recompile: 'rimraf ./node_modules/' + packName + '/dist && babel --presets env --plugins transform-object-rest-spread -d ./node_modules/' + packName + '/dist/ ./node_modules/' + packName + '/src/ --copy-files',
    recompileW: 'rimraf ./node_modules/' + packName + '/dist && babel --presets env --plugins transform-object-rest-spread -d ./node_modules/' + packName + '/dist/ ./node_modules/' + packName + '/src/ --copy-files -w',
    start: 'node ./node_modules/' + packName + '/dist/start.js',
    electron: 'node ./node_modules/' + packName + '/scripts/electron.js',
    storybook: 'start-storybook -p 9001 -c ./resources/storybook',
    karma: 'NODE_ENV=test; babel-node --presets env -- ./node_modules/karma/bin/karma start ./node_modules/' + packName + '/dist/config/karma.config.js'
};

newData.scripts = newData.scripts || {};
newData.configDate = new Date();

for (var key in scripts) {
    if (scripts.hasOwnProperty(key)) {
        newData.scripts['' + prefix + key] = scripts[key];
    }
}

if (clientJSONData) {
    _fsExtra2.default.writeJSONSync(clientJSON, newData, { spaces: 4 });
} else {
    console.log('SCRIPT MEANT TO BE RUN BY CLIENT');
}