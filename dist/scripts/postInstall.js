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
    var nodeBin = './node_modules/.bin/';
    var pack = './node_modules/' + packName;

    var scripts = {
        "// - - - React Base Project Starter Kit Scripts - - - //": "",
        recompile: 'rimraf ' + pack + '/dist && babel --presets env --plugins transform-object-rest-spread -d ' + pack + '/dist/ ' + pack + '/src/ --copy-files',
        recompileW: 'rimraf ' + pack + '/dist && babel --presets env --plugins transform-object-rest-spread -d ' + pack + '/dist/ ' + pack + '/src/ --copy-files -w',
        start: 'node ' + pack + '/dist/start.js',
        electron: 'node ' + pack + '/scripts/electron.js',
        storybook: 'node ' + pack + '/scripts/storybook.js',
        karma: 'node ' + pack + '/scripts/karma.js ',
        karmaWatch: 'node ' + pack + '/scripts/karma.js watch',
        jest: 'node ' + pack + '/scripts/jest.js ',
        jestWatch: 'node ' + pack + '/scripts/jest.js watch'
    };

    dataReader.addClientScript(null, scripts);
    dataReader.insertInClientPackageJsonKey(null, "rbc::eslintConfig", { root: true, globals: {}, extends: './node_modules/' + packName + '/dist/config/eslint.conf.js' });
    //dataReader.insertInClientPackageJsonKey(`rbc::eslintConfig",'extends',"./node_modules/${packName}/dist/config/eslint.conf.js`);
    dataReader.saveClientPackageJson();
} else {
    console.log('SCRIPT MEANT TO BE RUN BY CLIENT');
}