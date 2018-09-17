'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * File: karma.config.js | Package: React Base Starter Project
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                   * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                   */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _wp = require('./wp.config');

var _wp2 = _interopRequireDefault(_wp);

var _DataReader = require('../utilities/DataReader');

var _DataReader2 = _interopRequireDefault(_DataReader);

var _getURLData = require('../utilities/getURLData');

var _getURLData2 = _interopRequireDefault(_getURLData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var args = process.argv.slice(2);
var dataReader = new _DataReader2.default();

var configData = dataReader.config;
var localURLData = (0, _getURLData2.default)(configData.base.localURL);
var localPort = parseInt(localURLData.port) - 3;

var wpConfigSettings = (0, _wp2.default)(false, false, false, false, configData);
var watchMode = args.indexOf("--watchAll") > -1 ? "true" : false;

var karmaWebpackConfig = {
        devtool: "eval",
        mode: wpConfigSettings.mode,
        resolve: wpConfigSettings.resolve,
        resolveLoader: wpConfigSettings.resolveLoader,
        module: _extends({}, wpConfigSettings.module.noParse && { noParse: wpConfigSettings.module.noParse }, {
                rules: wpConfigSettings.module.rules || []
        }),
        optimization: {
                noEmitOnErrors: wpConfigSettings.optimization.noEmitOnErrors,
                nodeEnv: wpConfigSettings.optimization.nodeEnv
        },
        plugins: wpConfigSettings.plugins.slice(3, 4) //Adding CSS Extraction
};

var appPath = {
        tests: _path2.default.resolve(configData.tests.path),
        testsFile: _path2.default.resolve(configData.tests.karmaIndex)
};

module.exports = function (config) {
        config.set({

                // base path that will be used to resolve all patterns (eg. files, exclude)
                basePath: '.',

                // frameworks to use
                // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
                frameworks: ['mocha'],
                //frameworks: [ 'jasmine' ],


                // list of files / patterns to load in the browser
                files: [appPath.testsFile],

                // list of files to exclude
                exclude: [],

                // preprocess matching files before serving them to the browser
                // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
                preprocessors: _defineProperty({}, appPath.testsFile, ['webpack', 'sourcemap']),

                // test results reporter to use
                // possible values: 'dots', 'progress'
                // available reporters: https://npmjs.org/browse/keyword/karma-reporter
                reporters: ['mocha', 'notify'],
                mochaReporter: {
                        showDiff: true
                },

                notifyReporter: {
                        reportEachFailure: true, // Default: false, Will notify on every failed spec
                        reportSuccess: true // Default: true, Will notify when a suite was successful
                },

                webpack: karmaWebpackConfig,

                webpackMiddleware: {
                        noInfo: true,
                        logLevel: 'info'
                },

                // web server port
                port: localPort,

                // enable / disable colors in the output (reporters and logs)
                colors: true,

                // level of logging
                // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
                //logLevel: config.LOG_INFO,


                // enable / disable watching file and executing tests whenever any file changes
                autoWatch: true,

                // start these browsers
                // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
                browsers: ['Chrome'],

                // Continuous Integration mode
                // if true, Karma captures browsers, runs the tests and exits
                singleRun: !watchMode,

                // Concurrency level
                // how many browser should be started simultaneous
                concurrency: Infinity
        });
};