/**
 * File: karma.index.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import expect from 'expect';
import enzymify from 'expect-enzyme';
import Enzyme, { mount, shallow , render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

expect.extend(enzymify());
global.expect  = expect;
global.mount   = mount;
global.shallow = shallow;
global.render  = render;
global.sinon   = sinon;

process.env.testEnv = "Karma";

const context = require.context("../", true, /\.karma\.test\.js$/);
context.keys().forEach(context);
