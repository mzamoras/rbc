/*
 * File: storybook.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

/**
 * File: electron.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

const { spawnSync }   = require('child_process');
const config     = require('../../../rbc.config.js');
const {path, port} = config().storyBook;

spawnSync("node",[
    "./node_modules/@storybook/react/bin/index.js",
    "-p",
    port,
    "-c",
    path
  ],{ maxBuffer: 1024 * 1024, stdio:'inherit' });