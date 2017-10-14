"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * File: DataReader.js | Package: React Base Starter Project
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * This source code is licensed under the MIT license found in the
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * LICENSE file in the root directory of this source tree
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * 
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * CapitalMental && BackLogics Technologies
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Copyright 2014-present. | All rights reserved.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _fsExtra = require("fs-extra");

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DataReader = function () {
    _createClass(DataReader, [{
        key: "paths",
        get: function get() {

            var rbcPath = _path2.default.resolve(__dirname, "../../");
            var clientPath = _path2.default.resolve(rbcPath, "../../");
            var jsonName = "package.json";
            var confName = "rbc.config.js";

            return {
                client: clientPath,
                rbc: rbcPath,
                clientJson: _path2.default.resolve(clientPath, jsonName),
                clientConfig: _path2.default.resolve(clientPath, confName),
                rbcJson: _path2.default.resolve(rbcPath, jsonName)
            };
        }
    }, {
        key: "json",
        get: function get() {
            var _paths = this.paths,
                rbcJson = _paths.rbcJson,
                clientJson = _paths.clientJson;


            return {
                rbc: _fsExtra2.default.readJsonSync(rbcJson, { throws: false }) || null,
                client: _fsExtra2.default.readJsonSync(clientJson, { throws: false }) || null
            };
        }
    }, {
        key: "config",
        get: function get() {
            var clientConfig = this.paths.clientConfig;

            var hasConfig = _fsExtra2.default.pathExistsSync(clientConfig);

            return hasConfig ? require(clientConfig)(false, false) : {};
        }
    }, {
        key: "newPackageJson",
        get: function get() {

            this._oldPackageJson = this._oldPackageJson || this.json.client || null;

            if (!this._oldPackageJson) {
                console.log("Couldn't find package.json file in ", this.paths.clientJson);
                return;
            }

            if (!this._newPackageJson) {
                this._newPackageJson = Object.assign({}, _extends({}, this._oldPackageJson));
            }

            return this._newPackageJson;
        }
    }]);

    function DataReader() {
        _classCallCheck(this, DataReader);

        this.prefix = 'rbc::';
        this._newPackageJson = null;
        this._oldPackageJson = null;
    }

    _createClass(DataReader, [{
        key: "insertInClientPackageJsonKey",
        value: function insertInClientPackageJsonKey(key, name, value) {
            if (key) {
                if (!this.newPackageJson[key]) {
                    this.newPackageJson[key] = {};
                }
                this.newPackageJson[key][name] = value;
                return;
            }
            this.newPackageJson[name] = value;
        }
    }, {
        key: "insertCommentOnClientJson",
        value: function insertCommentOnClientJson(key, title) {
            var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';


            if (!this.newPackageJson[key]) {
                this.newPackageJson[key] = {};
            }

            var titleFixed = title.replace("//", "");
            this.newPackageJson[key]["// " + titleFixed] = value;
        }
    }, {
        key: "addClientScript",
        value: function addClientScript(scriptName, script) {
            var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.prefix;


            this.newPackageJson.scripts = this.newPackageJson.scripts || {};

            if (typeof script !== 'string') {
                for (var key in script) {
                    if (script.hasOwnProperty(key)) {
                        var pref = key.indexOf("//") > -1 ? "//" : prefix;
                        this.addClientScript(key, script[key], pref);
                    }
                }
            } else {
                if (scriptName.indexOf("//") > -1) {
                    this.insertCommentOnClientJson("scripts", scriptName, script);
                } else {
                    this.insertInClientPackageJsonKey('scripts', "" + prefix + scriptName, script);
                }
            }
        }
    }, {
        key: "saveClientPackageJson",
        value: function saveClientPackageJson() {
            _fsExtra2.default.writeJSONSync(this.paths.clientJson, this.newPackageJson, { spaces: 4 });
        }
    }]);

    return DataReader;
}();

exports.default = DataReader;