'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * File: bs.config.js | Package: React Base Starter Project
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                   * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                   */

/* export default function(){
    console.log("BS CONFIG");
} */

exports.default = function (isProductionEnvironment, hot, custom, gziped, bundle) {

    var hasProxy = !!custom.base.proxyURL;
    var isStatic = custom.base.useStaticHTML || (hasProxy ? false : true);
    var allowCrossOrigin = custom.base.allowCrossOrigin;

    var serverLocalURL = (0, _getURLData2.default)(custom.base.localURL);
    var serverProxyURL = hasProxy ? (0, _getURLData2.default)(custom.base.proxyURL) : null;

    var mainPort = parseInt(serverLocalURL.port, 10);
    var uiPort = mainPort - 1;
    var socketPort = !!custom.base.proxyURL ? mainPort - 2 : mainPort;

    var mainFolderName = _path2.default.basename(custom.paths.src);
    var destFolderName = _path2.default.basename(custom.paths.dest);
    var publicPathRelative = _path2.default.relative(process.cwd(), custom.paths.dest);

    var config = _extends({

        port: mainPort,
        ui: { port: uiPort },
        browser: "google chrome",
        reloadOnRestart: true,
        injectChanges: true,
        open: custom.base.autoOpenChrome,
        ghostMode: false,
        cors: allowCrossOrigin,
        logSnippet: true

    }, custom.base.sslCert && {
        https: custom.base.sslCert
    }, isStatic && {
        server: {
            baseDir: '' + publicPathRelative,
            index: "index.html"
        }
    }, !isStatic && {
        proxy: {
            target: serverProxyURL.simple,
            ws: true,

            proxyOptions: {
                xfwd: true
            }
        }
    }, {

        socket: {
            port: socketPort,
            domain: serverLocalURL.simple + ':' + socketPort
        },

        middleware: [(0, _webpackDevMiddleware2.default)(bundle, {
            publicPath: serverLocalURL.full + "/",
            quiet: false,
            noInfo: false,
            stats: { colors: true, chunks: false, modules: false, children: false, hash: false }
        }), (0, _webpackHotMiddleware2.default)(bundle), function (req, res, next) {

            if (custom.base.allowCrossOrigin) {
                res.setHeader('Access-Control-Allow-Origin', '*');
            }

            if (!isStatic) {
                res.setHeader('Content-Type', 'text/event-stream;charset=utf-8');
            }

            res.setHeader('Cache-Control', 'no-cache, no-transform');
            res.setHeader('Connection', 'keep-alive');
            next();
        }],

        files: [publicPathRelative + '/*.html', publicPathRelative + '/**/*.html', publicPathRelative + '/css/**/*.css', publicPathRelative + '/vendor/**/*.css']

    });

    return config;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _getURLData = require('../utilities/getURLData.js');

var _getURLData2 = _interopRequireDefault(_getURLData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }