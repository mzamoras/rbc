"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * File: babel.conf.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */
function _default() {
  var isProductionEnvironment = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var hot = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var newHot = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var presets = [[require.resolve('@babel/preset-env'), {
    modules: false
  }], require.resolve('@babel/preset-typescript'), require.resolve('@babel/preset-react')];
  var plugins = [require.resolve('@babel/plugin-proposal-class-properties'), [require.resolve('@babel/plugin-proposal-object-rest-spread'), {
    useBuiltIns: true
  }], [require.resolve('@babel/plugin-transform-runtime'), {
    helpers: false,
    regenerator: true
  }], [require.resolve('@babel/plugin-syntax-dynamic-import')], [require.resolve('babel-plugin-import'), {
    libraryName: 'antd',
    style: true
  }, 'ant'], [require.resolve('babel-plugin-import'), {
    libraryName: 'material-ui',
    libraryDirectory: 'components',
    camel2DashComponentName: false
  }, 'material-ui']];

  if (hot || newHot) {
    plugins.push(require.resolve('react-hot-loader/babel'));
  }

  return {
    babelrc: false,
    cacheDirectory: false,
    presets: presets,
    plugins: plugins
  };
}