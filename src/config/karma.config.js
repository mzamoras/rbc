

import fse from "fs-extra";
import path from 'path';
import webpack from 'webpack';
import wpConfig from './wp.config'
import getURLData from '../utilities/getURLData';

const rbcPath      = path.resolve( __dirname, "../../" );
const clientPath   = path.resolve( rbcPath, "../../" );
const clientConfig = path.resolve( clientPath, 'rbc.config.js' );
const configData   = require(clientConfig)(false, false);
const localURLData = getURLData(configData.base.localURL);
const localPort    = parseInt(localURLData.port) - 3;



const wpConfigSettings   = wpConfig( false, false, false, false, configData );
const karmaWebpackConfig = {
    devtool      : wpConfigSettings.devtool,
    resolve      : wpConfigSettings.resolve,
    resolveLoader: wpConfigSettings.resolveLoader,
    module       : {
        ...(wpConfigSettings.module.noParse && {noParse: wpConfigSettings.module.noParse }),
        loaders: wpConfigSettings.module.loaders  || [],
    }
}

const appPath = {
    tests    : path.resolve( configData.paths.src_react, "tests"),
    testsFile: path.resolve( configData.paths.src_react, "tests/index.config.js"),
};

module.exports = function( config ){
    config.set( {
        
                // base path that will be used to resolve all patterns (eg. files, exclude)
                basePath: '.',
        
                // frameworks to use
                // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
                frameworks: [ 'mocha' ],
                //frameworks: [ 'jasmine' ],
        
        
                // list of files / patterns to load in the browser
                files: [
                    appPath.testsFile
                ],
        
        
                // list of files to exclude
                exclude: [],
        
        
                // preprocess matching files before serving them to the browser
                // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
                preprocessors: {
                    // './test.config.js': [ 'webpack', 'sourcemap' ]
                    [appPath.testsFile]: [ 'webpack', 'sourcemap' ]
                },
        
        
                // test results reporter to use
                // possible values: 'dots', 'progress'
                // available reporters: https://npmjs.org/browse/keyword/karma-reporter
                reporters    : [ 'mocha', 'notify' ],
                mochaReporter: {
                    showDiff: true,
                },
        
                notifyReporter: {
                    reportEachFailure: true,   // Default: false, Will notify on every failed spec
                    reportSuccess    : true,   // Default: true, Will notify when a suite was successful
                },
        
                webpack: karmaWebpackConfig,
        
                webpackMiddleware: {
                    noInfo: true
                },
        
        
                // web server port
                port: localPort,
        
        
                // enable / disable colors in the output (reporters and logs)
                colors: true,
        
        
                // level of logging
                // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
                logLevel: config.LOG_INFO,
        
        
                // enable / disable watching file and executing tests whenever any file changes
                autoWatch: true,
        
        
                // start these browsers
                // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
                browsers: [ 'Chrome' ],
        
        
                // Continuous Integration mode
                // if true, Karma captures browsers, runs the tests and exits
                singleRun: false,
        
                // Concurrency level
                // how many browser should be started simultaneous
                concurrency: Infinity
            } )
}