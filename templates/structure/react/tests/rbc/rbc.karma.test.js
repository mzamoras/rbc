/**
 * File: rbc.karma.test.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

/* global describe, it, expect, mount, shallow, sinon */

import React from 'react';
import App from '../../App';
import RbcWelcome from '../../components/rbc/RbcWelcome';
import {DomNodeManager} from '../configuration/utilities/tddUtils';

const nodeManager = new DomNodeManager();

function testSetup(){
    const nodeData = nodeManager.makeNode();
    return{
        node   : nodeData.node,
        spy    : sinon.spy(),
        destroy: nodeData.destroy
    };
}

describe("Testing <App/>", ()=>{

    it("App Should be shown", ()=>{

        const { node, destroy } = testSetup();

        const wrapper = mount( <App/>, {
            attachTo: node
        } );

        const button = wrapper.findWhere( n => (n.prop('className') || '').indexOf('themeChanger') > -1 )
        const icon   = wrapper.findWhere( n => (n.prop('className') || '').indexOf('material-icon') > -1 );

        expect(wrapper).toBeDefined();
        expect(wrapper.state().themeStyle).toEqual("light");
        expect(icon.text().indexOf("invert_colors")).toBeGreaterThan(-1);

        button.simulate('click');

        expect(wrapper.state().themeStyle).toEqual("dark");
        expect(icon.text().indexOf("invert_colors_off")).toBeGreaterThan(-1);
        destroy();

    })
    
});

describe("Testing <RbcWelcome/>", ()=>{

    it("RbcWelcome Should be shown", ()=>{
        const { node, spy, destroy } = testSetup();

        const wrapper = mount( <RbcWelcome themeStyle='light' handleThemeChange={spy}/>, {
            attachTo: node
        } );

        const button = wrapper.findWhere( n => (n.prop('className') || '').indexOf('themeChanger') > -1 )

        button.simulate('click');
        expect( spy.callCount ).toEqual(1);

        destroy();
    })
});