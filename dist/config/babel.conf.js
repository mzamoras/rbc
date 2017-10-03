'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {
    var isProductionEnvironment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    var hot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    var newHot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;


    var presets = [[require.resolve('babel-preset-env'), { modules: false /* , { 'es2015': { modules: false } } */ }], require.resolve('babel-preset-stage-2'), require.resolve('babel-preset-react')];

    var plugins = [require.resolve('babel-plugin-transform-class-properties'), [require.resolve('babel-plugin-transform-object-rest-spread'), { useBuiltIns: true }], [require.resolve('babel-plugin-transform-runtime'), {
        helpers: false,
        polyfill: false,
        regenerator: true,
        moduleName: _path2.default.dirname(require.resolve('babel-runtime/package'))
    }], [require.resolve('babel-plugin-import'), [{ libraryName: "antd", style: true }, { libraryName: "material-ui", libraryDirectory: "components", camel2DashComponentName: false }]]];

    if (hot || newHot) {
        presets.push(require.resolve(newHot ? 'react-hot-loader/babel' : 'babel-preset-react-hmre'));
    }

    return {
        babelrc: false,
        cacheDirectory: false,
        presets: presets,
        plugins: plugins
    };
};

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }