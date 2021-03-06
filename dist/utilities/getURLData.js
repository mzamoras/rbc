"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

/**
 * File: getURLData.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */
var url = require('url');

function _default(whatURL) {
  var tmp = url.parse(whatURL);

  if (!tmp.protocol || !tmp.hostname) {
    console.log('error with address: ' + whatURL);
    return false;
  }

  return {
    protocol: tmp.protocol,
    host: tmp.host,
    hostname: tmp.hostname,
    port: tmp.port || 80,
    secure: tmp.protocol === 'https:',
    simple: tmp.protocol + '//' + tmp.hostname,
    full: tmp.protocol + '//' + tmp.host
  };
}