/**
 * File: jest.index.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

module.exports = {
    verbose  : true,
    rootDir  : "../../",
    transform: {
        "^.+\\.(css|less)$": "./tests/configuration/jest.mock.js",
        "^.+\\.jsx?$"      : "./tests/configuration/jest.transform.js"
    },
    testMatch: ['**/__tests__/**/*.jest.js?(x)', '**/?*.jest.(test|spec).js?(x)'],
}

