/**
 * File: jest.transform.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

module.exports = require('babel-jest').createTransformer({
    presets: ['env', 'react', 'stage-2'], // or whatever
});