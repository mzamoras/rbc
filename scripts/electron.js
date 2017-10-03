/**
 * File: electron.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

const { exec }   = require('child_process');
const config     = require('../../../rbc.config.js');
const mainFolder = config().paths.src;

exec(`node ./node_modules/.bin/electron ${mainFolder}/electron/main.js`);