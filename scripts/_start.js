/**
 * File: _start.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

const { exec } = require('child_process');
const path     = require('path');

exec( 'node ' + path.resolve( __dirname, "../dist/start.js" ) );