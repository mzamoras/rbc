"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DataReader =
/*#__PURE__*/
function () {
  _createClass(DataReader, [{
    key: "newPackageJson",
    get: function get() {
      this._oldPackageJson = this._oldPackageJson || DataReader.json.client || null;

      if (!this._oldPackageJson) {
        console.log('Couldn\'t find package.json file in ', DataReader.paths.clientJson);
        return;
      }

      if (!this._newPackageJson) {
        this._newPackageJson = Object.assign({}, _objectSpread({}, this._oldPackageJson));
      }

      return this._newPackageJson;
    }
  }], [{
    key: "paths",
    get: function get() {
      var rbcPath = _path.default.resolve(__dirname, '../../');

      var clientPath = _path.default.resolve(rbcPath, '../../');

      var jsonName = 'package.json';
      var confName = 'rbc.config.js';
      return {
        client: clientPath,
        rbc: rbcPath,
        clientJson: _path.default.resolve(clientPath, jsonName),
        clientConfig: _path.default.resolve(clientPath, confName),
        rbcJson: _path.default.resolve(rbcPath, jsonName)
      };
    }
  }, {
    key: "json",
    get: function get() {
      var _DataReader$paths = DataReader.paths,
          rbcJson = _DataReader$paths.rbcJson,
          clientJson = _DataReader$paths.clientJson;
      return {
        rbc: _fsExtra.default.readJsonSync(rbcJson, {
          throws: false
        }) || null,
        client: _fsExtra.default.readJsonSync(clientJson, {
          throws: false
        }) || null
      };
    }
  }, {
    key: "config",
    get: function get() {
      var clientConfig = DataReader.paths.clientConfig;

      var hasConfig = _fsExtra.default.pathExistsSync(clientConfig);

      return hasConfig ? require(clientConfig)(false, false) : {};
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

      var titleFixed = title.replace('//', '');
      this.newPackageJson[key]['// ' + titleFixed] = value;
    }
  }, {
    key: "addClientScript",
    value: function addClientScript(scriptName, script) {
      var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : this.prefix;
      this.newPackageJson.scripts = this.newPackageJson.scripts || {};

      if (typeof script !== 'string') {
        for (var key in script) {
          if (script.hasOwnProperty(key)) {
            var pref = key.indexOf('//') > -1 ? '//' : prefix;
            this.addClientScript(key, script[key], pref);
          }
        }
      } else {
        if (scriptName.indexOf('//') > -1) {
          this.insertCommentOnClientJson('scripts', scriptName, script);
        } else {
          this.insertInClientPackageJsonKey('scripts', "".concat(prefix).concat(scriptName), script);
        }
      }
    }
  }, {
    key: "saveClientPackageJson",
    value: function saveClientPackageJson() {
      _fsExtra.default.writeJSONSync(DataReader.paths.clientJson, this.newPackageJson, {
        spaces: 4
      });
    }
  }]);

  return DataReader;
}();

exports.default = DataReader;