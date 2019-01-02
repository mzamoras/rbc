"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var emptyFunc = function emptyFunc() {
  return false;
};

var DataCollector =
/*#__PURE__*/
function () {
  function DataCollector(input, options) {
    _classCallCheck(this, DataCollector);

    this.input = input;
    this.options = options;
    this.messages = {};
    this.fileNames = {
      configFile: 'rbc.config.js',
      configTemplate: 'config.base.js'
    };
    this.env = {
      isHot: false,
      isProduction: false,
      isDevelopment: true,
      needsConfig: true,
      isClient: false,
      doMinimize: false
    };
    this.client = {
      path: null,
      packageJsonData: null,
      packageJsonPath: null,
      configFileData: null,
      configFilePath: null
    };
    this.rbc = {
      path: null,
      packageJsonData: null,
      packageJsonPath: null,
      templatesPath: null,
      defaultConfigWP: null,
      defaultConfigBS: null
    };
    DataCollector.welcome();
    this.boot();
  }

  _createClass(DataCollector, [{
    key: "boot",
    value: function boot() {
      var optKeys = Object.keys(this.options); //Environment

      this.env.isProduction = optKeys.includes('production') || optKeys.includes('production-hot');
      this.env.isHot = optKeys.includes('hot') || optKeys.includes('production-hot');
      this.env.isDevelopment = !this.env.isProduction;
      this.env.isGZip = true; //Client

      this.client.path = _path.default.resolve(process.cwd());
      this.client.packageJsonPath = _path.default.resolve(this.client.path, 'package.json');
      this.client.packageJsonData = _fsExtra.default.readJSONSync(this.client.packageJsonPath, {
        throws: false
      });
      this.client.configFilePath = _path.default.resolve(this.client.path, this.fileNames.configFile);
      this.client.configFileData = _fsExtra.default.pathExistsSync(this.client.configFilePath) ? require(this.client.configFilePath)(this.env.isProduction, this.env.isHot) : null;
      this.client.srcExist = this.client.configFileData ? _fsExtra.default.pathExistsSync(this.client.configFileData.paths.src) : false;
      this.client.srcExist = this.client.configFileData ? _fsExtra.default.pathExistsSync(this.client.configFileData.paths.src_react) : false; //Rbc

      this.rbc.path = _path.default.resolve(__dirname, '../../');
      this.rbc.templatesPath = _path.default.resolve(this.rbc.path, 'templates');
      this.rbc.templates_structure = _path.default.resolve(this.rbc.templatesPath, 'structure');
      this.rbc.templates_assets = _path.default.resolve(this.rbc.templates_structure, 'assets');
      this.rbc.templates_views = _path.default.resolve(this.rbc.templates_structure, 'views');
      this.rbc.templates_electron = _path.default.resolve(this.rbc.templates_structure, 'electron');
      this.rbc.templates_storybook = _path.default.resolve(this.rbc.templates_structure, 'storybook');
      this.rbc.templates_react = _path.default.resolve(this.rbc.templates_structure, 'react');
      this.rbc.templates_public = _path.default.resolve(this.rbc.templates_structure, 'public');
      this.rbc.configTemplate = _path.default.resolve(this.rbc.templatesPath, this.fileNames.configTemplate);
      this.rbc.packageJsonPath = _path.default.resolve(this.rbc.path, 'package.json');
      this.rbc.packageJsonData = _fsExtra.default.readJSONSync(this.rbc.packageJsonPath, {
        throws: false
      });
      this.defaultConfigWP = _path.default.resolve(this.rbc.path, 'dist/config/wp.config.js');
      this.defaultConfigBS = _path.default.resolve(this.rbc.path, 'dist/config/bs.config.js');
      this.defaultConfigBabel = _path.default.resolve(this.rbc.path, 'dist/config/babel.config.js');
      this.defaultConfigEslint = _path.default.resolve(this.rbc.path, 'dist/config/eslint.config.js');
      this.wpConfig = this.client.configFileData ? require(this.defaultConfigWP).default : emptyFunc;
      this.bsConfig = this.client.configFileData ? require(this.defaultConfigBS).default : emptyFunc;
      this.env.isClient = this.rbc.path !== this.client.path;
      this.env.needsConfig = !this.client.configFileData;
    } //
    // ─── MESSAGES ───────────────────────────────────────────────────────────────────
    //

  }], [{
    key: "setMessages",
    value: function setMessages() {
      var nr = _chalk.default.cyan;
      var nrb = nr.bold;
      var prod = _chalk.default.red.bold; // eslint-disable-line no-unused-vars

      var dev = _chalk.default.magenta.bold; // eslint-disable-line no-unused-vars

      return {
        title: nrb('REACT BASE COMPONENTS')
      };
    }
  }, {
    key: "welcome",
    value: function welcome() {
      DataCollector.clearConsole();
      var spacing = '                ';
      console.log('+-------------------------------------------------------+\n' + _chalk.default.dim('|', spacing) + _chalk.default.cyan.bold('REACT BASE COMPONENTS') + _chalk.default.dim(spacing, '|') + '\n' + '+-------------------------------------------------------+');
    }
  }, {
    key: "clearConsole",
    value: function clearConsole() {
      process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
    }
  }]);

  return DataCollector;
}();

exports.default = DataCollector;