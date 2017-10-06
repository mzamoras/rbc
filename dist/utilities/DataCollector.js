'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * File: MainManager.js | Package: React Base Starter Project
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var emptyFunc = function emptyFunc() {
    return false;
};

var DataCollector = function () {
    function DataCollector(input, options) {
        _classCallCheck(this, DataCollector);

        this.input = input;
        this.options = options;

        this.messages = {};

        this.fileNames = {
            configFile: "rbc.config.js",
            configTemplate: "config.base.js"
        };

        this.env = {
            isHot: false,
            isProduction: false,
            isDevelopment: true,
            needsConfig: true,
            isClient: false
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

        this.welcome();
        this.boot();
    }

    _createClass(DataCollector, [{
        key: 'boot',
        value: function boot() {
            var optKeys = Object.keys(this.options);

            //Environment
            this.env.isProduction = optKeys.includes("production") || optKeys.includes("production-hot");
            this.env.isHot = optKeys.includes("hot") || optKeys.includes("production-hot");
            this.env.isDevelopment = !this.env.isProduction;
            this.env.isGZip = true;

            //Client
            this.client.path = _path2.default.resolve(process.cwd());
            this.client.packageJsonPath = _path2.default.resolve(this.client.path, "package.json");
            this.client.packageJsonData = _fsExtra2.default.readJSONSync(this.client.packageJsonPath, { throws: false });
            this.client.configFilePath = _path2.default.resolve(this.client.path, this.fileNames.configFile);
            this.client.configFileData = _fsExtra2.default.pathExistsSync(this.client.configFilePath) ? require(this.client.configFilePath)(this.env.isProduction, this.env.isHot) : null;
            this.client.srcExist = this.client.configFileData ? _fsExtra2.default.pathExistsSync(this.client.configFileData.paths.src) : false;
            this.client.srcExist = this.client.configFileData ? _fsExtra2.default.pathExistsSync(this.client.configFileData.paths.src_react) : false;

            //Rbc
            this.rbc.path = _path2.default.resolve(__dirname, "../../");
            this.rbc.templatesPath = _path2.default.resolve(this.rbc.path, "templates");
            this.rbc.templates_structure = _path2.default.resolve(this.rbc.templatesPath, "structure");
            this.rbc.templates_assets = _path2.default.resolve(this.rbc.templates_structure, "assets");
            this.rbc.templates_views = _path2.default.resolve(this.rbc.templates_structure, "views");
            this.rbc.templates_electron = _path2.default.resolve(this.rbc.templates_structure, "electron");
            this.rbc.templates_storybook = _path2.default.resolve(this.rbc.templates_structure, "storybook");
            this.rbc.templates_react = _path2.default.resolve(this.rbc.templates_structure, "react");
            this.rbc.templates_public = _path2.default.resolve(this.rbc.templates_structure, "public");
            this.rbc.configTemplate = _path2.default.resolve(this.rbc.templatesPath, this.fileNames.configTemplate);
            this.rbc.packageJsonPath = _path2.default.resolve(this.rbc.path, "package.json");
            this.rbc.packageJsonData = _fsExtra2.default.readJSONSync(this.rbc.packageJsonPath, { throws: false });

            this.defaultConfigWP = _path2.default.resolve(this.rbc.path, 'dist/config/wp.config.js');
            this.defaultConfigBS = _path2.default.resolve(this.rbc.path, 'dist/config/bs.config.js');
            this.defaultConfigBabel = _path2.default.resolve(this.rbc.path, 'dist/config/babel.config.js');
            this.defaultConfigEslint = _path2.default.resolve(this.rbc.path, 'dist/config/eslint.config.js');

            this.wpConfig = this.client.configFileData ? require(this.defaultConfigWP).default : emptyFunc;
            this.bsConfig = this.client.configFileData ? require(this.defaultConfigBS).default : emptyFunc;

            this.env.isClient = this.rbc.path !== this.client.path;
            this.env.needsConfig = !this.client.configFileData;
        }

        //
        // ─── MESSAGES ───────────────────────────────────────────────────────────────────
        //


    }, {
        key: 'setMessages',
        value: function setMessages() {

            var nr = _chalk2.default.cyan;
            var nrb = nr.bold;
            var prod = _chalk2.default.red.bold;
            var dev = _chalk2.default.magenta.bold;

            return {
                title: nrb("REACT BASE COMPONENTS")
            };
        }
    }, {
        key: 'welcome',
        value: function welcome() {
            this.clearConsole();
            var spacing = "                ";
            console.log("+-------------------------------------------------------+\n" + _chalk2.default.dim("|", spacing) + _chalk2.default.cyan.bold("REACT BASE COMPONENTS") + _chalk2.default.dim(spacing, "|") + "\n" + "+-------------------------------------------------------+");
        }
    }, {
        key: 'clearConsole',
        value: function clearConsole() {
            process.stdout.write(process.platform === 'win32' ? '\x1Bc' : '\x1B[2J\x1B[3J\x1B[H');
        }
    }]);

    return DataCollector;
}();

exports.default = DataCollector;