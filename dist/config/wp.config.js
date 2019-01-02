"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var _extractTextWebpackPlugin = _interopRequireDefault(require("extract-text-webpack-plugin"));

var _webpackNotifier = _interopRequireDefault(require("webpack-notifier"));

var _caseSensitivePathsWebpackPlugin = _interopRequireDefault(require("case-sensitive-paths-webpack-plugin"));

var _compressionWebpackPlugin = _interopRequireDefault(require("compression-webpack-plugin"));

var _webpackManifestPlugin = _interopRequireDefault(require("webpack-manifest-plugin"));

var _writeFileWebpackPlugin = _interopRequireDefault(require("write-file-webpack-plugin"));

var _getURLData = _interopRequireDefault(require("../utilities/getURLData"));

var _babel = _interopRequireDefault(require("../config/babel.conf"));

var _package = _interopRequireDefault(require("../../package.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var webpack = require('webpack');

var MinifyPlugin = require('babel-minify-webpack-plugin');

function _default() {
  var isProductionEnvironment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var hot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var gzipped = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var minimize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var custom = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var extractLESS = new _extractTextWebpackPlugin.default({
    filename: 'css/[name].css',
    allChunks: true
  });
  var extractCSS = new _extractTextWebpackPlugin.default('css/[name]-two.css');
  var serverLocalURL = (0, _getURLData.default)(custom.base.localURL); //const serverLocalProxy  = custom.base['proxyURL'] ? getURLData( custom.base['proxyURL'] ) : null;

  var browseSyncVersion = _package.default.dependencies['browser-sync'].replace('^', '');

  var _useEslintrc = custom.wp.eslintUsage.useEslintrc;

  var testStylesPath = _path.default.resolve(custom.paths.src, '/tests/utilities/');

  var babelConfigData = (0, _babel.default)(isProductionEnvironment, hot, false
  /* newHot */
  );

  var config = _objectSpread({
    devtool: isProductionEnvironment ? 'source-map' : 'cheap-module-source-map',
    mode: isProductionEnvironment ? 'production' : 'development',
    // Taking from configuration files
    entry: custom.wp.entry,
    output: _objectSpread({}, custom.wp.output, {
      path: custom.paths.dest,
      pathinfo: true,
      publicPath: serverLocalURL.full + '/'
    }),
    resolve: custom.wp.resolve,
    resolveLoader: {
      moduleExtensions: ['-loader']
    }
  }, custom.wp.target && {
    target: custom.wp.target
  }, {
    module: {
      rules: [// E S L I N T
      {
        test: [/\.jsx?$/, /\.tsx?$/],
        loader: 'eslint',
        include: [custom.paths.src_js, custom.paths.src_react],
        enforce: 'pre',
        options: _objectSpread({}, !_useEslintrc && {
          configFile: _path.default.resolve(__dirname, './eslint.conf.js')
        }, {
          useEslintrc: _useEslintrc
        })
      }, // T S L I N T
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
        test: /\.[jt]sx?$/,
        include: [custom.paths.src_js, custom.paths.src_react],
        loader: 'babel',
        query: babelConfigData
      }, {
        test: /\.jsx?$/,
        include: /node_modules/,
        use: ['react-hot-loader/webpack']
      }, // C S S
      {
        test: /\.css$/,
        include: [custom.paths.src_media, custom.paths.src_css, testStylesPath],
        loader: extractCSS.extract({
          fallback: [{
            loader: 'style'
          }],
          use: ['css', 'postcss']
        })
      }, // L E S S
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
              sourceMap: !isProductionEnvironment //minimize      : isProductionEnvironment

            }
          }, {
            loader: 'postcss',
            options: {
              ident: 'postcss',
              plugins: function plugins() {
                if (!isProductionEnvironment) return [];
                return [(0, _autoprefixer.default)({
                  browsers: ['>2%', 'last 4 versions', 'Firefox ESR', 'not ie < 9']
                })];
              }
            }
          }, 'less']
        })
      }, // I M A G E S
      {
        test: /\.(jpg|png|gif|svg)(\?.*)?$/,
        include: [custom.paths.src_media],
        loader: 'file',
        query: {
          name: fileNaming('media/images', isProductionEnvironment)
        }
      }, // F O N T S
      {
        test: /\.(eot|(font\.svg)|ttf|woff|woff2)(\?.*)?$/,
        include: [custom.paths.src_css, custom.paths.src_fonts],
        loader: 'file',
        query: {
          name: fileNaming('fonts', isProductionEnvironment)
        }
      }, // V I D E O S
      {
        test: /\.(mp4|webm)(\?.*)?$/,
        include: [custom.paths.src_media],
        loader: 'url',
        query: {
          limit: 10000,
          name: fileNaming('media/videos', isProductionEnvironment)
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
        name: 'boot'
      },
      splitChunks: {
        cacheGroups: _objectSpread({}, custom.wp.vendorsInSameChunk.length > 0 && {
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
    new _webpackManifestPlugin.default({
      fileName: 'js/asset-manifest.json'
    }),
    /**
     * Extract all files to disk
     */
    new _writeFileWebpackPlugin.default({
      test: /(js|css|media|fonts)\//
    }), // Extract for less and css
    extractLESS, extractCSS]
  }); // Allowing Cross Origin


  if (custom.base.allowCrossOrigin) {
    config.devServer = {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    };
  }

  if (!isProductionEnvironment) {
    config.plugins.push(new _caseSensitivePathsWebpackPlugin.default());
    config.plugins.push(new _webpackNotifier.default({
      title: custom.base.projectName || 'React Base Components',
      excludeWarnings: true,
      alwaysNotify: true,
      contentImage: custom.base.notificationsIcon || _path.default.resolve(__dirname, '../../templates/rbc.png')
    }));
  }

  if (minimize) {
    //config.plugins.push( new webpack.optimize.UglifyJsPlugin( settings.uglify ) );
    config.plugins.push(new MinifyPlugin({}, {
      test: /\.js($|\?)/i
    }));
  }

  if (gzipped) {
    config.plugins.push(new _compressionWebpackPlugin.default({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      minRatio: 0.8
    }));
  }

  if (hot) {
    var entries = Object.keys(custom.wp.entry);
    var lastEntry = entries[entries.length - 1];
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
    config.plugins.push(new webpack.NamedModulesPlugin());
    config.entry[lastEntry].push('webpack-hot-middleware/client');

    if (!isProductionEnvironment) {
      config.entry[lastEntry].push(require.resolve('../utilities/browserSyncDuplicates.js'));
    }
  }

  return config;
}

;

function cssModuleNaming(prod) {
  var hashing = 'hash:base64';
  return prod ? "[".concat(hashing, ":7]") : "[name]--[local]__[".concat(hashing, ":5]");
}

function fileNaming() {
  var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var prod = arguments.length > 1 ? arguments[1] : undefined;
  var useExtension = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var specialProd = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var dirName = name ? name + '/' : '';
  var extension = useExtension ? '.[ext]' : '';
  return "".concat(dirName, "[").concat(prod ? 'sha512:hash:base64:7' : 'name', "]").concat(extension);
}