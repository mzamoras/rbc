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

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackNotifierPlugin from 'webpack-notifier';
import CaseSensitivePlugin from 'case-sensitive-paths-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';
import WriteFilePlugin from 'write-file-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';

import getURLData from '../utilities/getURLData';
import babelConfig from '../config/babel.conf';
import pJson from '../../package.json';
import {formatCssLoader} from '../utilities/helpers';

export default function( isProductionEnvironment = false, _hot = true, gzipped = false, minimize = false, custom = {} ){

    const hot = _hot && !isProductionEnvironment;
    const extractLESS_SASS = new ExtractTextPlugin( { filename: 'css/[name].css', allChunks: true } );
    const extractCSS  = new MiniCssExtractPlugin( { filename: 'css/[name]css.css', chunkFilename: 'css/[id]css.css' } );

    const serverLocalURL    = getURLData( custom.base.localURL );
    const browseSyncVersion = pJson.dependencies['browser-sync'].replace( '^', '' );
    const _useEslintrc      = custom.wp.eslintUsage.useEslintrc;
    const testStylesPath    = path.resolve(custom.paths.src, '/tests/utilities/');
    const babelConfigData   =  babelConfig( isProductionEnvironment, hot, false/* newHot */ );

    // const cssLoaders = [{
    //     loader : 'css',
    //     options: {
    //         modules       : true,
    //         localIdentName: cssModuleNaming(isProductionEnvironment),
    //         sourceMap     : !isProductionEnvironment,
    //         //minimize      : isProductionEnvironment
    //         //importLoaders: 1
    //     }
    // }];
    //
    // if( isProductionEnvironment ){
    //     cssLoaders.push( {
    //         loader : 'postcss',
    //         options: {
    //             ident  : 'postcss',
    //             plugins: function () {
    //                 return [
    //                     require('autoprefixer')( {
    //                         browsers: [
    //                             '>2%',
    //                             'last 4 versions',
    //                             'Firefox ESR',
    //                             'not ie < 9', // React doesn't support IE8 anyway
    //                         ]
    //                     } )
    //                 ]
    //             }
    //         }
    //     } );
    // }

    const config = {
        
        devtool: isProductionEnvironment ? 'source-map': 'cheap-module-source-map',
        mode   : isProductionEnvironment ? 'production' : 'development',

        // Taking from configuration files
        entry : custom.wp.entry,
        output: {
            ...custom.wp.output,
            path      : custom.paths.dest,
            pathinfo  : true,
            publicPath: serverLocalURL.full + '/'
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
                    test   : [/\.jsx?$/, /\.tsx?$/],
                    loader : 'eslint',
                    include: [custom.paths.src_js, custom.paths.src_react],
                    enforce: 'pre',
                    options: {
                        ...( !_useEslintrc && { configFile : path.resolve( __dirname, './eslint.conf.js' ) } ),
                        useEslintrc: _useEslintrc
                    }
                }, 

                // T S L I N T
                // {
                //     test: /\.tsx?$/,
                //     enforce: "pre",
                //     include: [custom.paths.src_js, custom.paths.src_react],
                //     use:[{
                //         loader : 'tslint',
                //         options: {
                //             tsConfigFile: custom.paths.src_tsconfig || path.resolve(__dirname,"../../templates/tsconfig.json"),
                //             configFile: custom.paths.src_tslint || path.resolve(__dirname,"../../templates/tslint.json"),
                //             formattersDirectory: 'node_modules/custom-tslint-formatters/formatters',
                //             formatter: 'grouped'
                //         },
                //     }],
                //     //exclude: /(node_modules)/
                // },

                // B A B E L
                {
                    test   : /\.[jt]sx?$/,
                    include: [ custom.paths.src_js, custom.paths.src_react],
                    loader : 'babel',
                    query  : babelConfigData
                },

                {
                    test: /\.jsx?$/,
                    include: /node_modules/,
                    use: ['react-hot-loader/webpack'],
                },

                // C S S
                {
                    test   : /\.css$/,
                    include: [custom.paths.src_media, custom.paths.src_css, testStylesPath],
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader
                        },
                    ].concat(formatCssLoader(isProductionEnvironment, { sourceMap: isProductionEnvironment } ))
                },

                // L E S S
                {
                    test   : /\.less$/,
                    include: [custom.paths.src_media, custom.paths.src_less, testStylesPath],
                    loader : extractLESS_SASS.extract( {
                        fallback: [{
                            loader: 'style',
                        }],

                        use: formatCssLoader(isProductionEnvironment).concat(['less'])
                    } )
                },

                // S C S S
                {
                    test   : /\.s[ac]ss$/,
                    include: [custom.paths.src_media, custom.paths.src_sass, testStylesPath],
                    loader : extractLESS_SASS.extract( {
                        fallback: [{
                            loader: 'style',
                        }],

                        use: formatCssLoader(isProductionEnvironment).concat(['sass'])
                    } )
                },

                // I M A G E S
                {
                    test   : /\.(jpg|png|gif|svg)(\?.*)?$/,
                    include: [custom.paths.src_media],
                    loader : 'file',
                    query  : {
                        name: fileNaming( 'media/images', isProductionEnvironment )
                    }
                },

                // F O N T S
                {
                    test   : /\.(eot|(font\.svg)|ttf|woff|woff2)(\?.*)?$/,
                    include: [custom.paths.src_css, custom.paths.src_fonts],
                    loader : 'file',
                    query  : {
                        name: fileNaming( 'fonts', isProductionEnvironment )
                    }
                },

                // V I D E O S
                {
                    test   : /\.(mp4|webm)(\?.*)?$/,
                    include: [custom.paths.src_media],
                    loader : 'url',
                    query  : {
                        limit: 10000,
                        name : fileNaming( 'media/videos', isProductionEnvironment )
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
                name: 'boot'
            },

            splitChunks: {
                cacheGroups: {
                    ...( custom.wp.vendorsInSameChunk.length > 0 && {
                        commons:{
                            name: 'commons',
                            chunks: 'all',
                            test: chunk => {
                                const targets = custom.wp.vendorsInSameChunk || [];
                                return targets.find( t => {
                                    return t.test(chunk.context);
                                } );
                            }
                        }
                    } )
                }
            },

            minimizer: [new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                uglifyOptions: {
                    warnings: false,
                    parse: {},
                    compress: {},
                    mangle: true, // Note `mangle.properties` is `false` by default.
                    output: null,
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_fnames: false
                },
                extractComments: true
            })],
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
            extractLESS_SASS,
            //extractSASS,
            extractCSS,
            //new CheckerPlugin()

        ]

    };

    // Allowing Cross Origin
    if( custom.base.allowCrossOrigin ){
        config.devServer = {
            headers: { 'Access-Control-Allow-Origin': '*' }
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

    // if ( minimize === 99999 ) {
    //     //config.plugins.push( new webpack.optimize.UglifyJsPlugin( settings.uglify ) );
    //     config.plugins.push(new MinifyPlugin({
    //         mangle: {
    //             keepFnName: false
    //         },
    //
    //     }, { test: /\.js($|\?)/i }) );
    //
    // }

    if( gzipped ){
        config.plugins.push( new CompressionPlugin( {
            filename    : '[path].gz[query]',
            algorithm: 'gzip',
            test     : /\.js$|\.css$|\.html$/,
            minRatio : 0.8
        } ) );
    }

    if ( hot ) {

        const entries   = Object.keys(custom.wp.entry);
        const lastEntry = entries[ entries.length -1 ];

        config.plugins.push( new webpack.HotModuleReplacementPlugin() );
        config.plugins.push( new webpack.NamedModulesPlugin() );
        config.entry[lastEntry].push( 'webpack-hot-middleware/client' );
        
        if(!isProductionEnvironment){
            config.entry[lastEntry].push( require.resolve( '../utilities/browserSyncDuplicates.js' ) );
        }
    }

    return config;
};


// function cssModuleNaming( prod ){
//     const hashing = 'hash:base64';
//     return prod ? `[${hashing}:7]`: `[name]--[local]__[${hashing}:5]`;
// }

function fileNaming( name = null, prod, useExtension = true, specialProd = false ){

    const dirName   = name ? name + '/' : '';
    const extension = useExtension ? '.[ext]' : '';
    return `${dirName}[${ prod ? 'sha512:hash:base64:7' : 'name'}]${extension}`;
}