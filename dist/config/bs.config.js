"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _webpackDevMiddleware = _interopRequireDefault(require("webpack-dev-middleware"));

var _webpackHotMiddleware = _interopRequireDefault(require("webpack-hot-middleware"));

var _getURLData = _interopRequireDefault(require("../utilities/getURLData.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _default(isProductionEnvironment, hot, custom, gzipped, bundle, electronCallBack) {
  var hasProxy = !!custom.base['proxyURL'];
  var isStatic = custom.base.useStaticHTML || !hasProxy;
  var allowCrossOrigin = custom.base.allowCrossOrigin;
  var serverLocalURL = (0, _getURLData.default)(custom.base.localURL);
  var serverProxyURL = hasProxy ? (0, _getURLData.default)(custom.base['proxyURL']) : null;
  var mainPort = parseInt(serverLocalURL.port, 10);
  var uiPort = mainPort - 1;
  var socketPort = !!custom.base['proxyURL'] ? mainPort - 2 : mainPort; //const mainFolderName     = path.basename( custom.paths.src );
  //const destFolderName     = path.basename( custom.paths.dest );

  var publicPathRelative = _path.default.relative(process.cwd(), custom.paths.dest);

  var bundleWP = (0, _webpackDevMiddleware.default)(bundle, {
    publicPath: serverLocalURL.full + '/',
    quiet: false,
    noInfo: false,
    stats: {
      colors: true,
      chunks: false,
      modules: false,
      children: false,
      hash: false
    }
  });
  bundleWP.waitUntilValid(function () {
    console.log('Package is in a valid state');

    if (electronCallBack) {
      console.log('Opening Electron');
      electronCallBack();
    }
  });
  return _objectSpread({
    port: mainPort,
    ui: {
      port: uiPort
    },
    browser: 'google chrome',
    reloadOnRestart: true,
    injectChanges: true,
    open: custom.base.autoOpenChrome,
    ghostMode: false,
    cors: allowCrossOrigin,
    logSnippet: true
  }, custom.base.sslCert && _fsExtra.default.pathExistsSync(custom.base.sslCert) && {
    https: custom.base.sslCert
  }, isStatic && {
    server: {
      baseDir: "".concat(publicPathRelative),
      index: 'index.html'
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
      domain: "".concat(serverLocalURL.simple, ":").concat(socketPort)
    },
    middleware: [bundleWP, (0, _webpackHotMiddleware.default)(bundle), function (req, res, next) {
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
    files: ["".concat(publicPathRelative, "/*.html"), "".concat(publicPathRelative, "/**/*.html"), "".concat(publicPathRelative, "/css/**/*.css"), "".concat(publicPathRelative, "/vendor/**/*.css")]
  });
}