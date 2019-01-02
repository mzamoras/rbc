/*
 * File: TypeScriptComponent.tsx | Package: React Base Starter Project
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import React from 'react';

interface Props {
    title?: string;
}

export default class TypeScriptComponent extends React.Component <Props, {}> {

    render() {
        return(
            <div style={{ textAlign: 'center', fontSize: 13 }}>=={this.props.title}==</div>
        );
    }
}
