'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _rxjs = require('rxjs');

var _browserSync = require('browser-sync');

var _browserSync2 = _interopRequireDefault(_browserSync);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _connectGzipStatic = require('connect-gzip-static');

var _connectGzipStatic2 = _interopRequireDefault(_connectGzipStatic);

var _DataCollector2 = require('./DataCollector');

var _DataCollector3 = _interopRequireDefault(_DataCollector2);

var _child_process = require('child_process');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * File: Package.js | Package: React Base Starter Project
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * LICENSE file in the root directory of this source tree
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Package = function (_DataCollector) {
    _inherits(Package, _DataCollector);

    function Package(input, options) {
        _classCallCheck(this, Package);

        return _possibleConstructorReturn(this, (Package.__proto__ || Object.getPrototypeOf(Package)).call(this, input, options));
    }

    _createClass(Package, [{
        key: 'init',
        value: function init() {
            if (this.env.isClient && this.env.needsConfig) {
                console.log('Configuring');
            }
        }
    }, {
        key: 'setup',
        value: function setup() {
            var _this2 = this;

            var observe = _rxjs.Observable.create(function (obs) {

                obs.next({
                    type: 'input',
                    name: 'projectName',
                    message: ' Project Name ?',
                    default: "New Project"
                });

                obs.next({
                    type: 'confirm',
                    name: 'isLocalhost',
                    message: ' Use localhost to serve the project ?',
                    default: true
                });

                obs.next({
                    type: 'confirm',
                    name: 'isHttps',
                    message: ' Use secure server to serve the project ( https:// ) ?',
                    default: false
                });

                obs.next({
                    type: 'input',
                    name: 'localAddress',
                    message: ' Address or IP to serve the project ?',
                    default: "localhost",
                    when: function when(_ref) {
                        var isLocalhost = _ref.isLocalhost;
                        return !isLocalhost;
                    }
                });

                obs.next({
                    type: 'input',
                    name: 'localPort',
                    message: ' Local Port?',
                    default: "5001"
                });

                obs.next({
                    type: 'confirm',
                    name: 'useProxy',
                    message: ' Do you want to use a proxy ?',
                    default: false
                });

                obs.next({
                    type: 'input',
                    name: 'proxyAddress',
                    message: ' Proxy address and port?',
                    default: "http://example.com:80",
                    when: function when(_ref2) {
                        var useProxy = _ref2.useProxy;
                        return useProxy;
                    }
                });

                obs.next({
                    type: 'confirm',
                    name: 'autoOpenChrome',
                    message: ' Auto open chrome when serving ?',
                    default: false
                });

                obs.complete();
            });

            _inquirer2.default.prompt(observe).then(function (answers) {
                var data = _fsExtra2.default.readFileSync(_this2.rbc.configTemplate, { encoding: "utf8" });
                var address = answers.isLocalhost ? "localhost" : answers.localAddress;
                var protocol = answers.isHttps ? "https" : "http";
                var projectAddress = protocol + '://' + address + ':' + answers.localPort;
                var clientConf = data.replace(/\%PROJECT_NAME\%/g, answers.projectName).replace(/\%LOCAL_ADDRESS\%/g, projectAddress).replace(/\%PROXY_ADDRESS\%/g, answers.useProxy ? answers.proxyAddress : projectAddress).replace(/\/\/USE_PROXY\/\//g, answers.useProxy ? "" : "//").replace(/false\,\/\/OPEN_CHROME\/\//g, answers.autoOpenChrome ? "true" : "false").replace(/true\,\/\/USE_STATIC\/\//g, answers.useProxy ? "false" : "true");

                _fsExtra2.default.outputFileSync(_this2.client.configFilePath, clientConf);
            });
        }
    }, {
        key: 'copyTemplateFiles',
        value: function copyTemplateFiles() {
            var _this3 = this;

            var observe = _rxjs.Observable.create(function (obs) {
                obs.next({
                    type: 'confirm',
                    name: 'copy',
                    message: ' Copy template files based on your ( rbc.config.js ) configuration file ?',
                    default: false
                });

                obs.next({
                    type: 'confirm',
                    name: 'viewBlade',
                    message: ' Since your project has a proxy,\n Would you like to use php blade file for index template ( app.blade.php ) ? \nNote:( For Laravel Usage ) ?',
                    default: false,
                    when: function when(answers) {
                        return answers.copy && !!_this3.client.configFileData.base.proxyURL;
                    }
                });

                obs.complete();
            });

            _inquirer2.default.prompt(observe).then(function (answers) {
                if (answers.copy) {
                    _fsExtra2.default.copySync(_this3.rbc.templates_assets, _path2.default.resolve(_this3.client.configFileData.paths.src, "assets"));
                    _fsExtra2.default.copySync(_this3.rbc.templates_react, _path2.default.resolve(_this3.client.configFileData.paths.src, "react"));
                    _fsExtra2.default.copySync(_this3.rbc.templates_electron, _path2.default.resolve(_this3.client.configFileData.paths.src, "electron"));
                    _fsExtra2.default.copySync(_this3.rbc.templates_storybook, _path2.default.resolve(_this3.client.configFileData.paths.src, "storybook"));
                    _fsExtra2.default.copySync(_this3.rbc.templates_public, _this3.client.configFileData.paths.dest);

                    if (answers.viewBlade) {
                        _fsExtra2.default.copySync(_this3.rbc.templates_views, _path2.default.resolve(_this3.client.configFileData.paths.src, "views"));
                    }

                    console.log('Templates Copied');
                } else {
                    console.log('Nothing Copied');
                }
            });
        }
    }, {
        key: 'startServer',
        value: function startServer() {
            var _this4 = this;

            return new Promise(function (resolve, reject) {

                //Delete old files
                _this4.deleteOldPublicFiles();

                var wpConf = _this4.wpConfig(_this4.env.isProduction, _this4.env.isHot, _this4.env.isGZip, _this4.env.doMinimize, _this4.client.configFileData);
                var bsConf = _this4.bsConfig(_this4.env.isProduction, _this4.env.isHot, _this4.client.configFileData, _this4.env.isGZip, (0, _webpack2.default)(wpConf));

                var browserSync = _browserSync2.default.create('mainBrowserSyncServer');

                browserSync.init(bsConf, function (err, bs) {

                    if (_this4.env.isProduction || _this4.env.isGZip) {
                        bs.addMiddleware("*", (0, _connectGzipStatic2.default)(_this4.client.configFileData.paths.dest), {
                            override: true
                        });
                    }

                    if (err) return console.log(err);
                    resolve();
                });
            });
        }
    }, {
        key: 'runElectronApp',
        value: function runElectronApp() {
            var _this5 = this;

            var isUsingServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            var watch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

            if (!isUsingServer) {
                var initialized = false;
                var wpConf = this.wpConfig(this.env.isProduction, false, false, this.env.isProduction, this.client.configFileData);
                var compiler = (0, _webpack2.default)(wpConf);
                var statsConf = { colors: true, chunks: false, modules: false, children: false, hash: false };
                var errorManager = function errorManager(err) {
                    if (err) console.log(err);
                    return !!err;
                };
                var printStats = function printStats(stats) {
                    return console.log(stats.toString(statsConf));
                };
                var compileFunc = function compileFunc(err, stats) {
                    if (errorManager(err)) {
                        return;
                    }
                    _this5.welcome();
                    console.log("\n");
                    printStats(stats);
                    if (!initialized) {
                        console.log(_chalk2.default.yellow("\nOpening App ..."));
                        (0, _child_process.exec)("npm run rbc::electron");
                        initialized = true;
                    }
                    if (watch) {
                        console.log(_chalk2.default.yellow("\nWaiting for changes ... "));
                    } else {
                        console.log(_chalk2.default.dim("\nTo quit app: ctrl + c    ( here on console ) \n             command + q ( on the app window ) "));
                    }
                };

                compiler[watch ? 'watch' : 'run'](watch ? {} : compileFunc, watch ? compileFunc : null);
                return;
            }

            (0, _child_process.exec)("npm run rbc::electron");
        }
    }, {
        key: 'runTest',
        value: function runTest(comm) {
            var watch = comm.indexOf("Watch") > -1;
            var select = "";

            if (comm.indexOf("Karma") > -1) {
                select = watch ? "rbc::karmaWatch" : "rbc::karma";
            } else if (comm.indexOf("Jest") > -1) {
                select = watch ? "rbc::jestWatch" : "rbc::jest";
            } else {
                select = "rbc::storybook";
            }

            (0, _child_process.spawnSync)("npm", ['run', select], { stdio: 'inherit' });
        }
    }, {
        key: 'runRecompile',
        value: function runRecompile(comm) {
            var watch = comm.indexOf("Watch") > -1;
            (0, _child_process.spawnSync)("npm", ['run', watch ? "rbc::recompileW" : "rbc::recompile"], { stdio: 'inherit' });
        }
    }, {
        key: 'runReset',
        value: function runReset(comm) {
            var _this6 = this;

            var reader = new DataReader();
            var reset = comm.indexOf("Delete") > -1;

            if (reset) {
                console.log(_chalk2.default.red.bold('\n -------------------------------------'));
                console.log(_chalk2.default.red.bold(' I M P O R T A N T :'));
                console.log(_chalk2.default.red.bold(' This could potentially lead to loss of'));
                console.log(_chalk2.default.red.bold(' your important files. All Folders created '));
                console.log(_chalk2.default.red.bold(' with this tool will be deleted. Be sure to'));
                console.log(_chalk2.default.red.bold(' backup your important files first.'));
                console.log(_chalk2.default.red.bold(' -------------------------------------\n'));
            } else {
                console.log(_chalk2.default.red.bold('\n -------------------------------------'));
                console.log(_chalk2.default.red.bold(' I M P O R T A N T :'));
                console.log(_chalk2.default.red.bold(' This will delete your configuration file'));
                console.log(_chalk2.default.red.bold(' if you are unsure of this make a backup '));
                console.log(_chalk2.default.red.bold(' of this file first.'));
                console.log(_chalk2.default.red.bold(' -------------------------------------\n'));
            }

            var observe = _rxjs.Observable.create(function (obs) {
                obs.next({
                    type: 'confirm',
                    name: 'config',
                    message: _chalk2.default.red.bold(' Are you suer you want to delete your configuration file ( rbc.config.js ) ?'),
                    when: !reset,
                    default: false
                });

                obs.next({
                    type: 'confirm',
                    name: 'reset',
                    message: _chalk2.default.red.bold(' Are you suer you want to delete your configurtion file and template files ?'),
                    default: false,
                    when: reset
                });

                obs.complete();
            });

            _inquirer2.default.prompt(observe).then(function (answers) {
                if (!!answers.reset) {

                    var files = _glob2.default.sync("**/*.*", {
                        cwd: _this6.rbc.templatesPath
                    });

                    files.push(_this6.client.configFilePath);

                    files.forEach(function (f) {
                        var fName = f.replace("structure/", _this6.client.configFileData.paths.src + "/");
                        try {
                            _fsExtra2.default.unlinkSync(fName);
                            console.log(_chalk2.default.yellow('Deleted'), _chalk2.default.dim(fName));
                        } catch (e) {}
                    });

                    (0, _rimraf2.default)(_path2.default.resolve(_this6.client.configFileData.paths.src, "react"), function () {});
                    (0, _rimraf2.default)(_path2.default.resolve(_this6.client.configFileData.paths.src, "electron"), function () {});
                    (0, _rimraf2.default)(_path2.default.resolve(_this6.client.configFileData.paths.src, "storybook"), function () {});
                    (0, _rimraf2.default)(_path2.default.resolve(_this6.client.configFileData.paths.src, "public"), function () {});

                    return;
                }

                if (!!answers.config) {
                    try {
                        _fsExtra2.default.unlinkSync(_this6.client.configFilePath);
                        console.log(_chalk2.default.yellow('Deleted'), _chalk2.default.dim(_this6.client.configFilePath));
                    } catch (e) {}
                    return;
                }

                console.log(_chalk2.default.yellow('Nothing was deleted!!'));
            });
        }
    }, {
        key: 'deleteOldPublicFiles',
        value: function deleteOldPublicFiles() {
            var destPath = this.client.configFileData.paths.dest;
            var emptyFunc = function emptyFunc() {};
            (0, _rimraf2.default)(_path2.default.resolve(destPath, "css"), emptyFunc);
            (0, _rimraf2.default)(_path2.default.resolve(destPath, "js"), emptyFunc);
            (0, _rimraf2.default)(_path2.default.resolve(destPath, "images"), emptyFunc);
            (0, _rimraf2.default)(_path2.default.resolve(destPath, "fonts"), emptyFunc);
        }
    }]);

    return Package;
}(_DataCollector3.default);

exports.default = Package;