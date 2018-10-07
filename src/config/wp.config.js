/**
 * File: wp.config.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import path from 'path';
const webpack = require( 'webpack' );
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import CaseSensitivePlugin from 'case-sensitive-paths-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
const MinifyPlugin = require("babel-minify-webpack-plugin");
import { CheckerPlugin } from 'awesome-typescript-loader';


import getURLData from '../utilities/getURLData';
import babelConfig from '../config/babel.conf';
import eslintConfig from '../config/eslint.conf';
import pJson from '../../package.json';

export default function( isProductionEnvironment = false, hot = true, gziped = false, minimize = false, custom = {} ){

    const extractLESS = new ExtractTextPlugin( { filename: 'css/[name].css', allChunks: true } );
    const extractCSS  = new ExtractTextPlugin( 'css/[name]-two.css' );

    const serverLocalURL    = getURLData( custom.base.localURL );
    const serverLocalProxy  = custom.base.proxyURL ? getURLData( custom.base.proxyURL ) : null;
    const browseSyncVersion = pJson.dependencies['browser-sync'].replace( "^", "" );
    const _useEslintrc      = custom.wp.eslintUsage.useEslintrc;
    const testStylesPath    = path.resolve(custom.paths.src,"/tests/utilities/");
    const babelConfigData   =  babelConfig( isProductionEnvironment, hot, false/* newHot */ );

    const config = {
        
        devtool: isProductionEnvironment ? "source-map": "cheap-module-source-map",
        mode   : isProductionEnvironment ? "production" : "development",

        // Taking from configuration files
        entry : custom.wp.entry,
        output: {
            ...custom.wp.output,
            path      : custom.paths.dest,
            pathinfo  : true,
            publicPath: serverLocalURL.full + "/"
        },
        resolve: custom.wp.resolve,

        resolveLoader: {
            moduleExtensions: ['-loader']
        },

        ...( custom.wp.target && { target: custom.wp.target }),

        module: {

            rules:[

                // E S L I N T
                {
                    test   : /\.jsx?$/,
                    loader : 'eslint',
                    include: [custom.paths.src_js, custom.paths.src_react],
                    enforce: "pre",
                    options: {
                        ...( !_useEslintrc && { configFile : path.resolve( __dirname, "./eslint.conf.js" ) } ),
                        useEslintrc: _useEslintrc
                    }
                }, 

                // T S L I N T
                {
                    test: /\.tsx?$/,
                    enforce: "pre",
                    include: [custom.paths.src_js, custom.paths.src_react],
                    use:[{
                        loader : 'tslint',
                        options: {
                            tsConfigFile: custom.paths.src_tsconfig || path.resolve(__dirname,"../../templates/tsconfig.json"),
                            configFile: custom.paths.src_tslint || path.resolve(__dirname,"../../templates/tslint.json"),
                            formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
                            formatter: 'grouped'
                        },
                    }],
                    //exclude: /(node_modules)/
                },

                // B A B E L
                {
                    test   : /\.jsx?$/,
                    include: [ custom.paths.src_js, custom.paths.src_react],
                    loader : 'babel',
                    query  : babelConfigData
                },

                // T Y P E S C R I P T
                {
                    test: /\.tsx?$/,
                    loader: 'awesome-typescript',
                    include: [ custom.paths.src_js, custom.paths.src_react],
                    query:{ 
                        useBabel: true, 
                        babelOptions: {
                            babelrc:false,
                            presets: babelConfigData.presets,
                            plugins: babelConfigData.plugins
                        },
                        configFileName: custom.paths.src_tsconfig || path.resolve(__dirname,"../../templates/tsconfig.json")
                    }
                },

                // C S S
                {
                    test   : /\.css$/,
                    include: [custom.paths.src_media, custom.paths.src_css, testStylesPath],
                    loader : extractCSS.extract( {

                        fallback: [{
                            loader: 'style',
                        }],
                        
                        use: ['css', 'postcss']
                    } )
                },

                // L E S S
                {
                    test   : /\.less$/,
                    include: [custom.paths.src_media, custom.paths.src_less, testStylesPath],
                    loader : extractLESS.extract( {
                        fallback: [{
                            loader: 'style',
                        }],

                        use: [
                            {
                                loader : 'css',
                                options: {
                                    modules       : true,
                                    localIdentName: cssModuleNaming(isProductionEnvironment),
                                    sourceMap     : !isProductionEnvironment,
                                    minimize      : isProductionEnvironment
                                }
                            }, 
                            {
                            loader : 'postcss',
                            options: {
                                ident  : 'postcss',
                                plugins: function () {
                                    if ( !isProductionEnvironment ) return [];
                                    return [
                                        autoprefixer( {
                                            browsers: [
                                                '>2%',
                                                'last 4 versions',
                                                'Firefox ESR',
                                                'not ie < 9', // React doesn't support IE8 anyway
                                            ]
                                        } )
                                    ]
                                }
                            }
                        }, 'less']
                    } )
                },

                // I M A G E S
                {
                    test   : /\.(jpg|png|gif|svg)(\?.*)?$/,
                    include: [custom.paths.src_media],
                    loader : 'file',
                    query  : {
                        name: fileNaming( "media/images", isProductionEnvironment )
                    }
                },

                // F O N T S
                {
                    test   : /\.(eot|(font\.svg)|ttf|woff|woff2)(\?.*)?$/,
                    include: [custom.paths.src_css, custom.paths.src_fonts],
                    loader : 'file',
                    query  : {
                        name: fileNaming( "fonts", isProductionEnvironment )
                    }
                },

                // V I D E O S
                {
                    test   : /\.(mp4|webm)(\?.*)?$/,
                    include: [custom.paths.src_media],
                    loader : 'url',
                    query  : {
                        limit: 10000,
                        name : fileNaming( "media/videos", isProductionEnvironment )
                    }
                }
            ]

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
                cacheGroups: {
                    ...( custom.wp.vendorsInSameChunk.length > 0 && {
                        commons:{
                            name: 'commons',
                            chunks: 'all',
                            test: chunk => {
                                const targets = custom.wp.vendorsInSameChunk || [];
                                return targets.find( t => t.test( chunk.context ) );
                            }
                        }
                    } )
                }
            }
        },

        plugins: [

            /**
             * Add vars to the environment
             */
            new webpack.DefinePlugin( {
                'process.env': {
                    'SERVER_PORT'    : JSON.stringify( serverLocalURL.port ),
                    'SERVER_URL_FULL': JSON.stringify( serverLocalURL.full ),
                    'BS_VER'         : JSON.stringify( browseSyncVersion || false ),
                    'IS_HOT'         : JSON.stringify( hot ),
                }
            } ),

            /**
             * Manifest file
             */
            new ManifestPlugin( {
                fileName: 'js/asset-manifest.json'
            } ),

            /**
             * Extract all files to disk
             */
            new WriteFilePlugin( { test: /(js|css|media|fonts)\// } ),

            // Extract for less and css
            extractLESS,
            extractCSS,
            new CheckerPlugin()

        ]

    };

    // Allowing Cross Origin
    if( custom.base.allowCrossOrigin ){
        config.devServer = {
            headers: { "Access-Control-Allow-Origin": "*" }
        }
    }

    if ( !isProductionEnvironment ) {
        config.plugins.push( new CaseSensitivePlugin() );
        config.plugins.push( new WebpackNotifierPlugin( {
            title          : custom.base.projectName || 'React Base Components',
            excludeWarnings: true,
            alwaysNotify   : true,
            contentImage   : custom.base.notificationsIcon || path.resolve( __dirname,'../../templates/rbc.png' )
        } ) );
    }

    if ( minimize ) {
        //config.plugins.push( new webpack.optimize.UglifyJsPlugin( settings.uglify ) );
        config.plugins.push(new MinifyPlugin({}, { test: /\.js($|\?)/i }) );
        
    }

    if( gziped ){
        config.plugins.push( new CompressionPlugin( {
            asset    : "[path].gz[query]",
            algorithm: "gzip",
            test     : /\.js$|\.css$|\.html$/,
            minRatio : 0.8
        } ) );
    }

    if ( hot ) {

        const entries   = Object.keys(custom.wp.entry);
        const lastEntry = entries[ entries.length -1 ];

        config.plugins.push( new webpack.HotModuleReplacementPlugin() );
        config.plugins.push( new webpack.NamedModulesPlugin() );
        //if ( newHot ) config.entry.app.push( 'react-hot-loader/patch' );
        config.entry[lastEntry].push( 'webpack-hot-middleware/client' + '?path=' + serverLocalURL.full + '/__webpack_hmr' );
        
        if(!isProductionEnvironment){
            config.entry[lastEntry].push( require.resolve( '../utilities/browserSyncDuplicates.js' ) );
        }
    }

    return config;
};


function cssModuleNaming( prod ){
    const hashing = 'hash:base64';
    return prod ? `[${hashing}:7]`: `[name]--[local]__[${hashing}:5]`;
}

function fileNaming( name = null, prod, useExtension = true, specialProd = false ){

    const dirName   = name ? name + "/" : "";
    const extension = useExtension ? "." + "[ext]" : "";
    return `${dirName}[${ prod ? "sha512:hash:base64:7" : 'name'}]${extension}`;
}