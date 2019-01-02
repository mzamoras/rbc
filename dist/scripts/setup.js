"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _fs = _interopRequireDefault(require("fs"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _chalk = _interopRequireDefault(require("chalk"));

var _messages = _interopRequireDefault(require("../utilities/messages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * File: setup.js | Package: Monoux
 * 
 * Author : Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 11 Sep, 2017 | 12: 50 PM
 * 
 * This file is part of a package and all the information, intellectual
 * and technical concepts contained here are property of their owners.
 * Any kind of use, reproduction, distribution, publication, etc. without
 * express written permission from CapitalMental && BackLogics Technologies
 * is strictly forbidden.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */
var createQuestion = [{
  type: 'confirm',
  name: 'setup',
  message: 'Do you want to create it ? ( ./rbc.config.js ) ',
  default: false
}, {
  type: 'confirm',
  name: 'setupFiles',
  message: 'Do you want to create the folder structure ? ',
  default: false,
  when: function when(answers) {
    return !!answers.setup;
  }
}];

function _default() {
  var appDirectory = _fs.default.realpathSync(process.cwd());

  var configFileName = 'rbc.config.js';

  var templateFile = _path.default.join(__dirname, '../../templates/config.base.js');

  var configFile = _path.default.resolve(appDirectory, configFileName);

  return new Promise(function (resolve, reject) {
    _messages.default.setup.init();

    if (!_fs.default.existsSync(configFile)) {
      _inquirer.default.prompt(createQuestion).then(function (answers) {
        if (!answers.setup) {
          _messages.default.setup.noCreate();

          reject(false);
        } else {
          _fs.default.writeFileSync(configFile, _fs.default.readFileSync(templateFile));

          _messages.default.setup.created(configFile);
        }

        if (answers.setupFiles) {
          var customConf = require('../../templates/config.base');

          var mainBaseName = _path.default.basename(customConf(false, false).paths.src);

          var templateStructure = _path.default.join(__dirname, '../../templates/structure');

          _fsExtra.default.copy(templateStructure, _path.default.join(appDirectory, mainBaseName)).then(function () {
            return console.log('ok');
          }).catch(function (err) {
            return console.log('error', e);
          });
        }

        _messages.default.setup.noContinue();

        reject();
      });
    } else {
      _messages.default.setup.configFound();

      resolve();
    }
  });
}