'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * File: wp.config.js | Package: React Base Starter Project
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                   * LICENSE file in the root directory of this source tree
                                                                                                                                                                                                                                                                   * 
                                                                                                                                                                                                                                                                   * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                   * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                   */

exports.default = function () {
    var isProductionEnvironment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var hot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var gziped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var minimize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var custom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};


    var extractLESS = new _extractTextWebpackPlugin2.default({ filename: 'css/[name].css', allChunks: true });
    var extractCSS = new _extractTextWebpackPlugin2.default('css/[name]-two.css');

    var serverLocalURL = (0, _getURLData2.default)(custom.base.localURL);
    var serverLocalProxy = custom.base.proxyURL ? (0, _getURLData2.default)(custom.base.proxyURL) : null;
    var browseSyncVersion = _package2.default.dependencies['browser-sync'].replace("^", "");
    var _useEslintrc = custom.wp.eslintUsage.useEslintrc;
    var testStylesPath = _path2.default.resolve(custom.paths.src, "/tests/utilities/");
    var babelConfigData = (0, _babel2.default)(isProductionEnvironment, hot, false /* newHot */);

    var config = {

        devtool: isProductionEnvironment ? "source-map" : "cheap-module-source-map",
        mode: isProductionEnvironment ? "production" : "development",

        // Taking from configuration files
        entry: custom.wp.entry,
        output: _extends({}, custom.wp.output, {
            path: custom.paths.dest,
            pathinfo: true,
            publicPath: serverLocalURL.full + "/"
        }),
        resolve: custom.wp.resolve,

        resolveLoader: {
            moduleExtensions: ['-loader']
        },

        module: {

            rules: [

            // E S L I N T
            {
                test: /\.jsx?$/,
                loader: 'eslint',
                include: [custom.paths.src_js, custom.paths.src_react],
                enforce: "pre",
                options: _extends({}, !_useEslintrc && { configFile: _path2.default.resolve(__dirname, "./eslint.conf.js") }, {
                    useEslintrc: _useEslintrc
                })
            },

            // T S L I N T
            {
                test: /\.tsx?$/,
                enforce: "pre",
                include: [custom.paths.src_js, custom.paths.src_react],
                use: [{
                    loader: 'tslint',
                    options: {
                        tsConfigFile: custom.paths.src_tsconfig || _path2.default.resolve(__dirname, "../../templates/tsconfig.json"),
                        configFile: custom.paths.src_tslint || _path2.default.resolve(__dirname, "../../templates/tslint.json"),
                        formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
                        formatter: 'grouped'
                    }
                }]
                //exclude: /(node_modules)/
            },

            // B A B E L
            {
                test: /\.jsx?$/,
                include: [custom.paths.src_js, custom.paths.src_react],
                loader: 'babel',
                query: babelConfigData
            },

            // T Y P E S C R I P T
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript',
                include: [custom.paths.src_js, custom.paths.src_react],
                query: {
                    useBabel: true,
                    babelOptions: {
                        babelrc: false,
                        presets: babelConfigData.presets,
                        plugins: babelConfigData.plugins
                    },
                    configFileName: custom.paths.src_tsconfig || _path2.default.resolve(__dirname, "../../templates/tsconfig.json")
                }
            },

            // C S S
            {
                test: /\.css$/,
                include: [custom.paths.src_media, custom.paths.src_css, testStylesPath],
                loader: extractCSS.extract({

                    fallback: [{
                        loader: 'style'
                    }],

                    use: ['css', 'postcss']
                })
            },

            // L E S S
            {
                test: /\.less$/,
                include: [custom.paths.src_media, custom.paths.src_less, testStylesPath],
                loader: extractLESS.extract({
                    fallback: [{
                        loader: 'style'
                    }],

                    use: [{
                        loader: 'css',
                        options: {
                            modules: true,
                            localIdentName: cssModuleNaming(isProductionEnvironment),
                            sourceMap: !isProductionEnvironment,
                            minimize: isProductionEnvironment
                        }
                    }, {
                        loader: 'postcss',
                        options: {
                            ident: 'postcss',
                            plugins: function plugins() {
                                if (!isProductionEnvironment) return [];
                                return [(0, _autoprefixer2.default)({
                                    browsers: ['>2%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
                                })];
                            }
                        }
                    }, 'less']
                })
            },

            // I M A G E S
            {
                test: /\.(jpg|png|gif|svg)(\?.*)?$/,
                include: [custom.paths.src_media],
                loader: 'file',
                query: {
                    name: fileNaming("media/images", isProductionEnvironment)
                }
            },

            // F O N T S
            {
                test: /\.(eot|(font\.svg)|ttf|woff|woff2)(\?.*)?$/,
                include: [custom.paths.src_css, custom.paths.src_fonts],
                loader: 'file',
                query: {
                    name: fileNaming("fonts", isProductionEnvironment)
                }
            },

            // V I D E O S
            {
                test: /\.(mp4|webm)(\?.*)?$/,
                include: [custom.paths.src_media],
                loader: 'url',
                query: {
                    limit: 10000,
                    name: fileNaming("media/videos", isProductionEnvironment)
                }
            }]

        },

        optimization: {
            /**
             * Avoid error when compiling
             */
            noEmitOnErrors: true,

            /**
             * Define environment
             */
            nodeEnv: isProductionEnvironment ? 'production' : 'development',

            /**
             * Collects the bootstrap webpack files to the
             * boot.js file
             */
            runtimeChunk: {
                name: "boot"
            },

            splitChunks: {
                cacheGroups: _extends({}, custom.wp.vendorsInSameChunk.length > 0 && {
                    commons: {
                        name: 'commons',
                        chunks: 'all',
                        test: function test(chunk) {
                            var targets = custom.wp.vendorsInSameChunk || [];
                            return targets.find(function (t) {
                                return t.test(chunk.context);
                            });
                        }
                    }
                })
            }
        },

        plugins: [

        /**
         * Add vars to the environment
         */
        new webpack.DefinePlugin({
            'process.env': {
                'SERVER_PORT': JSON.stringify(serverLocalURL.port),
                'SERVER_URL_FULL': JSON.stringify(serverLocalURL.full),
                'BS_VER': JSON.stringify(browseSyncVersion || false),
                'IS_HOT': JSON.stringify(hot)
            }
        }),

        /**
         * Manifest file
         */
        new _webpackManifestPlugin2.default({
            fileName: 'js/asset-manifest.json'
        }),

        /**
         * Extract all files to disk
         */
        new _writeFileWebpackPlugin2.default({ test: /(js|css|media|fonts)\// }),

        // Extract for less and css
        extractLESS, extractCSS, new _awesomeTypescriptLoader.CheckerPlugin()]

    };

    // Allowing Cross Origin
    if (custom.base.allowCrossOrigin) {
        config.devServer = {
            headers: { "Access-Control-Allow-Origin": "*" }
        };
    }

    if (!isProductionEnvironment) {
        config.plugins.push(new _caseSensitivePathsWebpackPlugin2.default());
        config.plugins.push(new _webpackNotifier2.default({
            title: custom.base.projectName || 'React Base Components',
            excludeWarnings: true,
            alwaysNotify: true,
            contentImage: custom.base.notificationsIcon || _path2.default.resolve(__dirname, '../../templates/rbc.png')
        }));
    }

    if (minimize) {
        //config.plugins.push( new webpack.optimize.UglifyJsPlugin( settings.uglify ) );
        config.plugins.push(new MinifyPlugin({}, { test: /\.js($|\?)/i }));
    }

    if (gziped) {
        config.plugins.push(new _compressionWebpackPlugin2.default({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            minRatio: 0.8
        }));
    }

    if (hot) {

        var entries = Object.keys(custom.wp.entry);
        var lastEntry = entries[entries.length - 1];

        config.plugins.push(new webpack.HotModuleReplacementPlugin());
        config.plugins.push(new webpack.NamedModulesPlugin());
        //if ( newHot ) config.entry.app.push( 'react-hot-loader/patch' );
        config.entry[lastEntry].push('webpack-hot-middleware/client' + '?path=' + serverLocalURL.full + '/__webpack_hmr');

        if (!isProductionEnvironment) {
            config.entry[lastEntry].push(require.resolve('../utilities/browserSyncDuplicates.js'));
        }
    }

    return config;
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

var _webpackNotifier = require('webpack-notifier');

var _webpackNotifier2 = _interopRequireDefault(_webpackNotifier);

var _caseSensitivePathsWebpackPlugin = require('case-sensitive-paths-webpack-plugin');

var _caseSensitivePathsWebpackPlugin2 = _interopRequireDefault(_caseSensitivePathsWebpackPlugin);

var _compressionWebpackPlugin = require('compression-webpack-plugin');

var _compressionWebpackPlugin2 = _interopRequireDefault(_compressionWebpackPlugin);

var _webpackManifestPlugin = require('webpack-manifest-plugin');

var _webpackManifestPlugin2 = _interopRequireDefault(_webpackManifestPlugin);

var _writeFileWebpackPlugin = require('write-file-webpack-plugin');

var _writeFileWebpackPlugin2 = _interopRequireDefault(_writeFileWebpackPlugin);

var _awesomeTypescriptLoader = require('awesome-typescript-loader');

var _getURLData = require('../utilities/getURLData');

var _getURLData2 = _interopRequireDefault(_getURLData);

var _babel = require('../config/babel.conf');

var _babel2 = _interopRequireDefault(_babel);

var _eslint = require('../config/eslint.conf');

var _eslint2 = _interopRequireDefault(_eslint);

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var webpack = require('webpack');

var MinifyPlugin = require("babel-minify-webpack-plugin");
;

function cssModuleNaming(prod) {
    var hashing = 'hash:base64';
    return prod ? '[' + hashing + ':7]' : '[name]--[local]__[' + hashing + ':5]';
}

function fileNaming() {
    var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var prod = arguments[1];
    var useExtension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
    var specialProd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;


    var dirName = name ? name + "/" : "";
    var extension = useExtension ? "." + "[ext]" : "";
    return dirName + '[' + (prod ? "sha512:hash:base64:7" : 'name') + ']' + extension;
}