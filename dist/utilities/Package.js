'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _rxLiteAggregates = require('rx-lite-aggregates');

var _rxLiteAggregates2 = _interopRequireDefault(_rxLiteAggregates);

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

            var observe = _rxLiteAggregates2.default.Observable.create(function (obs) {

                obs.onNext({
                    type: 'input',
                    name: 'projectName',
                    message: ' Project Name ?',
                    default: "New Project"
                });

                obs.onNext({
                    type: 'input',
                    name: 'projectAddress',
                    message: ' Project local address and port ?',
                    default: "http://localhost:5001"
                });

                obs.onNext({
                    type: 'confirm',
                    name: 'useProxy',
                    message: ' Do you want to use a proxy ?',
                    default: false
                });

                obs.onNext({
                    type: 'input',
                    name: 'proxyAddress',
                    message: ' Proxy address and port?',
                    default: "http://example.com:80",
                    when: function when(_ref) {
                        var useProxy = _ref.useProxy;
                        return useProxy;
                    }
                });

                obs.onNext({
                    type: 'confirm',
                    name: 'autoOpenChrome',
                    message: ' Auto open chrome when serving ?',
                    default: true
                });

                obs.onCompleted();
            });

            _inquirer2.default.prompt(observe).then(function (answers) {
                var data = _fsExtra2.default.readFileSync(_this2.rbc.configTemplate, { encoding: "utf8" });
                var clientConf = data.replace(/\%PROJECT_NAME\%/g, answers.projectName).replace(/\%LOCAL_ADDRESS\%/g, answers.projectAddress).replace(/\%PROXY_ADDRESS\%/g, answers.useProxy ? answers.proxyAddress : answers.projectAddress).replace(/\/\/USE_PROXY\/\//g, answers.useProxy ? "" : "//").replace(/false\,\/\/OPEN_CHROME\/\//g, answers.autoOpenChrome ? "true" : "false");

                _fsExtra2.default.outputFileSync(_this2.client.configFilePath, clientConf);
            });
        }
    }, {
        key: 'copyTemplateFiles',
        value: function copyTemplateFiles() {
            var _this3 = this;

            var observe = _rxLiteAggregates2.default.Observable.create(function (obs) {
                obs.onNext({
                    type: 'confirm',
                    name: 'copy',
                    message: ' Copy template files based on your ( rbc.config.js ) configuration file ?',
                    default: false
                });

                obs.onNext({
                    type: 'confirm',
                    name: 'viewBlade',
                    message: ' Since your project has a proxy,\n Would you like to use php blade file for index template ( app.blade.php ) ? \nNote:( For Laravel Usage ) ?',
                    default: false,
                    when: function when(answers) {
                        return answers.copy && !!_this3.client.configFileData.base.proxyURL;
                    }
                });

                obs.onCompleted();
            });

            _inquirer2.default.prompt(observe).then(function (answers) {
                if (answers.copy) {
                    _fsExtra2.default.copySync(_this3.rbc.templates_assets, _path2.default.resolve(_this3.client.configFileData.paths.src, "assets"));
                    _fsExtra2.default.copySync(_this3.rbc.templates_react, _path2.default.resolve(_this3.client.configFileData.paths.src, "react"));
                    _fsExtra2.default.copySync(_this3.rbc.templates_electron, _path2.default.resolve(_this3.client.configFileData.paths.src, "electron"));
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

                var wpConf = _this4.wpConfig(_this4.env.isProduction, _this4.env.isHot, _this4.env.isGZip, _this4.env.doMinimize, _this4.client.configFileData);
                var bsConf = _this4.bsConfig(_this4.env.isProduction, _this4.env.isHot, _this4.client.configFileData, _this4.env.isGZip, (0, _webpack2.default)(wpConf));

                var browserSync = _browserSync2.default.create('mainBrowserSyncServer');

                browserSync.init(bsConf, function (err, bs) {

                    if (_this4.env.isProduction || _this4.env.isGzip) {
                        bs.addMiddleware("*", _connectGzipStatic2.default, {
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
    }]);

    return Package;
}(_DataCollector3.default);

exports.default = Package;