'use strict';

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _Package = require('./utilities/Package');

var _Package2 = _interopRequireDefault(_Package);

var _taketalk = require('taketalk');

var _taketalk2 = _interopRequireDefault(_taketalk);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * File: start.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

(0, _taketalk2.default)({

    init: function init(input, options) {

        this.pack = new _Package2.default(input, options);
        this.pack.init();

        if (this.pack.env.needsConfig && this.pack.env.isClient) {
            this.pack.setup();
            return;
        }

        if (!this.pack.client.srcExist && this.pack.env.isClient) {
            this.pack.copyTemplateFiles();
            return;
        }

        if (this[input]) {
            this[input]();
        } else {
            this.commandSelector();
        }
    },

    commandSelector: function commandSelector() {
        var _this = this;

        _inquirer2.default.prompt([{
            type: 'list',
            name: 'reqCommand',
            message: 'Which process would you like to run ?',
            choices: ['Run Server', 'Run Electron App', 'Run Both', new _inquirer2.default.Separator(), 'ReConfigure', 'Delete Configuration and Start Over', new _inquirer2.default.Separator(), 'Compile RBC package | One time', 'Compile RBC package | Watch Mode', new _inquirer2.default.Separator()],
            default: 0
        }, {
            type: 'confirm',
            name: 'productionServer',
            message: 'Do you want to run in PRODUCTION environment ?',
            default: false,
            when: function when(answers) {
                return answers.reqCommand.indexOf("Run") > -1;
            }
        }, {
            type: 'confirm',
            name: 'isHot',
            message: 'Run Hot Replacement ?',
            default: true,
            when: function when(answers) {
                return answers.reqCommand.indexOf("Run Server") > -1 || answers.reqCommand === "Run Both";
            }
        }, {
            type: 'confirm',
            name: 'isGZip',
            message: 'GZip compiled files ?',
            default: true,
            when: function when(answers) {
                return answers.reqCommand.indexOf("Run Server") > -1 || answers.reqCommand === "Run Both";
            }
        }, {
            type: 'confirm',
            name: 'doMinify',
            message: 'Minify compiled files ( compiling may be slower )?',
            default: false,
            when: function when(answers) {
                return answers.reqCommand.indexOf("Run Server") > -1 || answers.reqCommand === "Run Both";
            }
        }, {
            type: 'confirm',
            name: 'watch',
            message: 'Watch Mode: Watch for changes ( This is not HotModuleReload )?',
            default: true,
            when: function when(answers) {
                return answers.reqCommand.indexOf("Electron") > -1;
            }
        }]).then(function (answers) {

            if (answers.reqCommand.indexOf("Run") > -1) {
                var message = "Nothing Running";
                var srv = answers.productionServer ? "PRODUCTION" : "Development";
                var useServer = answers.reqCommand.indexOf("App") < 0;
                var runElectron = answers.reqCommand.indexOf("App") > -1 || answers.reqCommand.indexOf("Both") > -1;

                _this.pack.env.isHot = answers.isHot;
                _this.pack.env.isGZip = answers.isGZip;
                _this.pack.env.doMinify = answers.doMinify;
                _this.pack.env.isProduction = answers.productionServer;
                _this.pack.env.isDevelopment = !answers.productionServer;

                if (useServer) {
                    _this.pack.startServer().then(function () {
                        var to = setTimeout(function () {
                            if (runElectron) {
                                _this.pack.runElectronApp();
                            }
                            clearTimeout(to);
                        }, 500);
                    });
                } else if (!useServer && runElectron) {
                    _this.pack.runElectronApp(false, answers.watch);
                    _this.pack.env.doMinify = answers.productionServer;
                }

                _this.pack.welcome();
                console.log("   ===================================");
                console.log(_chalk2.default.cyan.bold("          Selected Configuration    "));
                console.log("   ===================================");
                console.log("       Running Server:", useServer ? _chalk2.default.green.bold("YES") : _chalk2.default.red.bold("NO"));
                console.log("     Running Electron:", runElectron ? _chalk2.default.green.bold("YES") : _chalk2.default.red.bold("NO"));
                console.log("           Hot Reload:", answers.isHot ? _chalk2.default.green.bold("YES") : _chalk2.default.red.bold("NO"));
                console.log("           GZip Files:", answers.isGZip ? _chalk2.default.green.bold("YES") : _chalk2.default.red.bold("NO"));
                console.log("       Minified Files:", answers.doMinify ? _chalk2.default.green.bold("YES") : _chalk2.default.red.bold("NO"));
                console.log("          Environment:", srv);
                if (!useServer && runElectron) {
                    console.log("     Watching Changes:", answers.watch ? _chalk2.default.green.bold("YES") : _chalk2.default.red.bold("NO"));
                }
                console.log("   ===================================\n");
                if (!useServer && runElectron) {
                    console.log(_chalk2.default.yellow("   Compiling ..."));
                }
            }
        });
    },


    help: 'Help Module!' || function () {
        console.log('Print this when a user wants help.');
    },

    version: '0.1.1' || function () {
        console.log('Print this when a user asks for the version.');
    }
});