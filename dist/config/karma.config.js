"use strict";

var _path = _interopRequireDefault(require("path"));

var _wp = _interopRequireDefault(require("./wp.config"));

var _DataReader = _interopRequireDefault(require("../utilities/DataReader"));

var _getURLData = _interopRequireDefault(require("../utilities/getURLData"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var args = process.argv.slice(2);
var dataReader = new _DataReader.default();
var configData = dataReader.config;
var localURLData = (0, _getURLData.default)(configData.base.localURL);
var localPort = parseInt(localURLData.port, 10) - 3;
var wpConfigSettings = (0, _wp.default)(false, false, false, false, configData);
var watchMode = args.indexOf('--watchAll') > -1 ? 'true' : false;
var karmaWebpackConfig = {
  devtool: 'eval',
  mode: wpConfigSettings.mode,
  resolve: wpConfigSettings.resolve,
  resolveLoader: wpConfigSettings.resolveLoader,
  module: _objectSpread({}, wpConfigSettings.module.noParse && {
    noParse: wpConfigSettings.module.noParse
  }, {
    rules: wpConfigSettings.module.rules || []
  }),
  optimization: {
    noEmitOnErrors: wpConfigSettings.optimization.noEmitOnErrors,
    nodeEnv: wpConfigSettings.optimization.nodeEnv
  },
  plugins: wpConfigSettings.plugins.slice(3, 4) //Adding CSS Extraction

};
var appPath = {
  tests: _path.default.resolve(configData.tests.path),
  testsFile: _path.default.resolve(configData.tests.karmaIndex)
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
      reportEachFailure: true,
      // Default: false, Will notify on every failed spec
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