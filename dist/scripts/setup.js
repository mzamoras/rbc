'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    var appDirectory = _fs2.default.realpathSync(process.cwd());
    var configFileName = "rbc.config.js";
    var templateFile = _path2.default.join(__dirname, "../../templates/config.base.js");
    var configFile = _path2.default.resolve(appDirectory, configFileName);

    return new Promise(function (resolve, reject) {

        _messages2.default.setup.init();

        if (!_fs2.default.existsSync(configFile)) {
            _inquirer2.default.prompt(createQuestion).then(function (answers) {
                if (!answers.setup) {
                    _messages2.default.setup.noCreate();
                    reject(false);
                } else {
                    _fs2.default.writeFileSync(configFile, _fs2.default.readFileSync(templateFile));
                    _messages2.default.setup.created(configFile);
                }

                if (answers.setupFiles) {

                    var customConf = require('../../templates/config.base');
                    var mainBaseName = _path2.default.basename(customConf(false, false).paths.src);
                    var templateStructure = _path2.default.join(__dirname, "../../templates/structure");

                    _fsExtra2.default.copy(templateStructure, _path2.default.join(appDirectory, mainBaseName)).then(function () {
                        return console.log('ok');
                    }).catch(function (err) {
                        return console.log('error', e);
                    });
                }

                _messages2.default.setup.noContinue();
                reject();
            });
        } else {
            _messages2.default.setup.configFound();
            resolve();
        }
    });
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _messages = require('../utilities/messages');

var _messages2 = _interopRequireDefault(_messages);

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
    type: "confirm",
    name: "setup",
    message: "Do you want to create it ? ( ./rbc.config.js ) ",
    default: false
}, {
    type: "confirm",
    name: "setupFiles",
    message: "Do you want to create the folder structure ? ",
    default: false,
    when: function when(answers) {
        return !!answers.setup;
    }
}];