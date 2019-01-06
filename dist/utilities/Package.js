"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _rimraf = _interopRequireDefault(require("rimraf"));

var _glob = _interopRequireDefault(require("glob"));

var _chalk = _interopRequireDefault(require("chalk"));

var _inquirer = _interopRequireDefault(require("inquirer"));

var _rxjs = require("rxjs");

var _browserSync = _interopRequireDefault(require("browser-sync"));

var _webpack = _interopRequireDefault(require("webpack"));

var _connectGzipStatic = _interopRequireDefault(require("connect-gzip-static"));

var _DataCollector2 = _interopRequireDefault(require("./DataCollector"));

var _child_process = require("child_process");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var Package =
/*#__PURE__*/
function (_DataCollector) {
  _inherits(Package, _DataCollector);

  function Package() {
    _classCallCheck(this, Package);

    return _possibleConstructorReturn(this, _getPrototypeOf(Package).apply(this, arguments));
  }

  _createClass(Package, [{
    key: "init",
    value: function init() {
      if (this.env.isClient && this.env.needsConfig) {
        console.log('Configuring');
      }
    }
  }, {
    key: "setup",
    value: function setup() {
      var _this = this;

      var observe = _rxjs.Observable.create(function (obs) {
        obs.next({
          type: 'input',
          name: 'projectName',
          message: ' Project Name ?',
          default: 'New Project'
        });
        obs.next({
          type: 'confirm',
          name: 'isLocalhost',
          message: ' Use localhost to serve the project ?',
          default: true
        });
        obs.next({
          type: 'confirm',
          name: 'isHttps',
          message: ' Use secure server to serve the project ( https:// ) ?',
          default: false
        });
        obs.next({
          type: 'input',
          name: 'localAddress',
          message: ' Address or IP to serve the project ?',
          default: 'localhost',
          when: function when(_ref) {
            var isLocalhost = _ref.isLocalhost;
            return !isLocalhost;
          }
        });
        obs.next({
          type: 'input',
          name: 'localPort',
          message: ' Local Port?',
          default: '5001'
        });
        obs.next({
          type: 'confirm',
          name: 'useProxy',
          message: ' Do you want to use a proxy ?',
          default: false
        });
        obs.next({
          type: 'input',
          name: 'proxyAddress',
          message: ' Proxy address and port?',
          default: 'http://example.com:80',
          when: function when(_ref2) {
            var useProxy = _ref2.useProxy;
            return useProxy;
          }
        });
        obs.next({
          type: 'confirm',
          name: 'autoOpenChrome',
          message: ' Auto open chrome when serving ?',
          default: false
        });
        obs.complete();
      });

      _inquirer.default.prompt(observe).then(function (answers) {
        var data = _fsExtra.default.readFileSync(_this.rbc.configTemplate, {
          encoding: 'utf8'
        });

        var address = answers['isLocalhost'] ? 'localhost' : answers['localAddress'];
        var protocol = answers['isHttps'] ? 'https' : 'http';
        var projectAddress = "".concat(protocol, "://").concat(address, ":").concat(answers.localPort);
        var clientConf = data.replace(/%PROJECT_NAME%/g, answers.projectName).replace(/%LOCAL_ADDRESS%/g, projectAddress).replace(/%PROXY_ADDRESS%/g, answers.useProxy ? answers['proxyAddress'] : projectAddress).replace(/\/\/USE_PROXY\/\//g, answers.useProxy ? '' : '//').replace(/false,\/\/OPEN_CHROME\/\//g, answers.autoOpenChrome ? 'true' : 'false').replace(/true,\/\/USE_STATIC\/\//g, answers.useProxy ? 'false' : 'true');

        _fsExtra.default.outputFileSync(_this.client.configFilePath, clientConf);
      });
    }
  }, {
    key: "copyTemplateFiles",
    value: function copyTemplateFiles() {
      var _this2 = this;

      var observe = _rxjs.Observable.create(function (obs) {
        obs.next({
          type: 'confirm',
          name: 'copy',
          message: ' Copy template files based on your ( rbc.config.js ) configuration file ?',
          default: false
        });
        obs.next({
          type: 'confirm',
          name: 'viewBlade',
          message: ' Since your project has a proxy,\n Would you like to use php blade file for index template ( app.blade.php ) ? \nNote:( For Laravel Usage ) ?',
          default: false,
          when: function when(answers) {
            return answers.copy && !!_this2.client.configFileData.base['proxyURL'];
          }
        });
        obs.complete();
      });

      _inquirer.default.prompt(observe).then(function (answers) {
        if (answers.copy) {
          _fsExtra.default.copySync(_this2.rbc.templates_assets, _path.default.resolve(_this2.client.configFileData.paths.src, 'assets'));

          _fsExtra.default.copySync(_this2.rbc.templates_react, _path.default.resolve(_this2.client.configFileData.paths.src, 'react'));

          _fsExtra.default.copySync(_this2.rbc.templates_electron, _path.default.resolve(_this2.client.configFileData.paths.src, 'electron'));

          _fsExtra.default.copySync(_this2.rbc.templates_storybook, _path.default.resolve(_this2.client.configFileData.paths.src, 'storybook'));

          _fsExtra.default.copySync(_this2.rbc.templates_public, _this2.client.configFileData.paths.dest);

          if (answers['viewBlade']) {
            _fsExtra.default.copySync(_this2.rbc.templates_views, _path.default.resolve(_this2.client.configFileData.paths.src, 'views'));
          }

          console.log('Templates Copied');
        } else {
          console.log('Nothing Copied');
        }
      });
    }
  }, {
    key: "startServer",
    value: function startServer() {
      var _this3 = this;

      var runElectron = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var electronCallBack = !runElectron ? null : function () {
        _this3.runElectronApp();
      }; //Delete old files

      this.deleteOldPublicFiles();
      var wpConf = this.wpConfig(this.env.isProduction, this.env.isHot, this.env.isGZip, this.env.doMinimize, this.client.configFileData);
      var bsConf = this.bsConfig(this.env.isProduction, this.env.isHot, this.client.configFileData, this.env.isGZip, (0, _webpack.default)(wpConf), electronCallBack);

      var browserSync = _browserSync.default.create('mainBrowserSyncServer');

      browserSync.init(bsConf, function (err, bs) {
        if (_this3.env.isProduction || _this3.env.isGZip) {
          bs.addMiddleware('*', (0, _connectGzipStatic.default)(_this3.client.configFileData.paths.dest), {
            override: true
          });
        }

        if (err) return console.log(err);
      });
    }
  }, {
    key: "runElectronApp",
    value: function runElectronApp() {
      var isUsingServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var watch = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

      if (!isUsingServer) {
        var initialized = false;
        var wpConf = this.wpConfig(this.env.isProduction, false, false, this.env.isProduction, this.client.configFileData);
        var compiler = (0, _webpack.default)(wpConf);
        var statsConf = {
          colors: true,
          chunks: false,
          modules: false,
          children: false,
          hash: false
        };

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

          Package.welcome();
          console.log('\n');
          printStats(stats);

          if (!initialized) {
            console.log(_chalk.default.yellow('\nOpening App ...'));
            (0, _child_process.exec)('npm run rbc::electron');
            initialized = true;
          }

          if (watch) {
            console.log(_chalk.default.yellow('\nWaiting for changes ... '));
          } else {
            console.log(_chalk.default.dim('\nTo quit app: ctrl + c    ( here on console ) \n             command + q ( on the app window ) '));
          }
        };

        compiler[watch ? 'watch' : 'run'](watch ? {} : compileFunc, watch ? compileFunc : null);
        return;
      }

      (0, _child_process.exec)('npm run rbc::electron');
    }
  }, {
    key: "runReset",
    value: function runReset(comm) {
      var _this4 = this;

      var reset = comm.indexOf('Delete') > -1;

      if (reset) {
        console.log(_chalk.default.red.bold('\n -------------------------------------'));
        console.log(_chalk.default.red.bold(' I M P O R T A N T :'));
        console.log(_chalk.default.red.bold(' This could potentially lead to loss of'));
        console.log(_chalk.default.red.bold(' your important files. All Folders created '));
        console.log(_chalk.default.red.bold(' with this tool will be deleted. Be sure to'));
        console.log(_chalk.default.red.bold(' backup your important files first.'));
        console.log(_chalk.default.red.bold(' -------------------------------------\n'));
      } else {
        console.log(_chalk.default.red.bold('\n -------------------------------------'));
        console.log(_chalk.default.red.bold(' I M P O R T A N T :'));
        console.log(_chalk.default.red.bold(' This will delete your configuration file'));
        console.log(_chalk.default.red.bold(' if you are unsure of this make a backup '));
        console.log(_chalk.default.red.bold(' of this file first.'));
        console.log(_chalk.default.red.bold(' -------------------------------------\n'));
      }

      var observe = _rxjs.Observable.create(function (obs) {
        obs.next({
          type: 'confirm',
          name: 'config',
          message: _chalk.default.red.bold(' Are you sure you want to delete your configuration file ( rbc.config.js ) ?'),
          when: !reset,
          default: false
        });
        obs.next({
          type: 'confirm',
          name: 'reset',
          message: _chalk.default.red.bold(' Are you sure you want to delete your configuration file and template files ?'),
          default: false,
          when: reset
        });
        obs.complete();
      });

      _inquirer.default.prompt(observe).then(function (answers) {
        if (!!answers.reset) {
          var files = _glob.default.sync('**/*.*', {
            cwd: _this4.rbc.templatesPath
          }) || [];
          files.push(_this4.client.configFilePath);
          files.forEach(function (f) {
            var fName = f.replace('structure/', _this4.client.configFileData.paths.src + '/');

            try {
              _fsExtra.default.unlinkSync(fName);

              console.log(_chalk.default.yellow('Deleted'), _chalk.default.dim(fName));
            } catch (e) {}
          });
          (0, _rimraf.default)(_path.default.resolve(_this4.client.configFileData.paths.src, 'react'), function () {});
          (0, _rimraf.default)(_path.default.resolve(_this4.client.configFileData.paths.src, 'electron'), function () {});
          (0, _rimraf.default)(_path.default.resolve(_this4.client.configFileData.paths.src, 'storybook'), function () {});
          (0, _rimraf.default)(_path.default.resolve(_this4.client.configFileData.paths.src, 'public'), function () {});
          return;
        }

        if (!!answers.config) {
          try {
            _fsExtra.default.unlinkSync(_this4.client.configFilePath);

            console.log(_chalk.default.yellow('Deleted'), _chalk.default.dim(_this4.client.configFilePath));
          } catch (e) {}

          return;
        }

        console.log(_chalk.default.yellow('Nothing was deleted!!'));
      });
    }
  }, {
    key: "deleteOldPublicFiles",
    value: function deleteOldPublicFiles() {
      var destPath = this.client.configFileData.paths.dest;

      var emptyFunc = function emptyFunc() {};

      (0, _rimraf.default)(_path.default.resolve(destPath, 'css'), emptyFunc);
      (0, _rimraf.default)(_path.default.resolve(destPath, 'js'), emptyFunc);
      (0, _rimraf.default)(_path.default.resolve(destPath, 'images'), emptyFunc);
      (0, _rimraf.default)(_path.default.resolve(destPath, 'fonts'), emptyFunc);
    }
  }], [{
    key: "runTest",
    value: function runTest(comm) {
      var watch = comm.indexOf('Watch') > -1;
      var select = '';

      if (comm.indexOf('Karma') > -1) {
        select = watch ? 'rbc::karmaWatch' : 'rbc::karma';
      } else if (comm.indexOf('Jest') > -1) {
        select = watch ? 'rbc::jestWatch' : 'rbc::jest';
      } else {
        select = 'rbc::storybook';
      }

      (0, _child_process.spawnSync)('npm', ['run', select], {
        stdio: 'inherit'
      });
    }
  }, {
    key: "runRecompile",
    value: function runRecompile(comm) {
      var watch = comm.indexOf('Watch') > -1;
      (0, _child_process.spawnSync)('npm', ['run', watch ? 'rbc::recompileW' : 'rbc::recompile'], {
        stdio: 'inherit'
      });
    }
  }]);

  return Package;
}(_DataCollector2.default);

exports.default = Package;