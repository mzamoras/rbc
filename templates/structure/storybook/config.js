/**
 * File: config.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import { configure } from '@storybook/react';

function loadStories() {
  require('./stories/rbcStory');
  // You can require as many stories as you need.
}

configure(loadStories, module);