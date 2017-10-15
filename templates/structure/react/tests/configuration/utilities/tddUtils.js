/**
 * File: tddUtils.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

let _mainNode  = null;
let _nodes     = [];

export class DomNodeManager{

    get defaults(){
        return {
            main_id    : "__tddMainContainer__",
            child_id   : "__tddChildContainer_@@__",
            main_class : "__tddMainContainer__",
            child_class: "__tddChildContainer__",
            style_id   : "__tdStyleNode__"
        }
    }

    constructor( injectStyles = true ){
        
        this.body  = document.body;
        this.style = injectStyles ?  require('css-loader!less-loader!../utilities/karmaTDD.less') : '';
        
        if( !_mainNode) {
            const mNode = document.getElementById( this.defaults.main_id )
            if( !mNode ){
                this.initializeMainNodes();
                return;
            }
            _mainNode = mNode;
        }
    }

    makeNode( ){

        const node = document.createElement( 'div' );

        const { child_id, child_class } = this.defaults;
        node.setAttribute("id", child_id.replace( "@@", _nodes.length + 1 ) );
        node.classList.add( child_class );
        _mainNode.appendChild(node);
        _nodes.push({node, id: child_id, destroy:( doDestroy = false )=>{
            if( !doDestroy ) return;
            _mainNode.removeChild( node );
            _nodes = _nodes.filter( el => el.id !== child_id );
        }});

        return _nodes[ _nodes.length - 1 ];
    }

    initializeMainNodes(){

        const { main_id, main_class, style_id } = this.defaults;

        const node      = document.createElement( 'div' );
        node.setAttribute("id", main_id);
        node.classList.add(main_class);
        this.body.appendChild( node );
        _mainNode = node;


        const styleNode = document.createElement( 'style' );
        styleNode.setAttribute( 'id', style_id );
        document.head.appendChild( styleNode );

        for (var key in this.style) {
            if (this.style.hasOwnProperty(key)) {
                styleNode.innerHTML += this.style[key][1];
            }
        }

        const title = document.createElement( 'div' );
        title.setAttribute( 'id', "__tddMainTitle__" );
        document.body.appendChild( title );
        title.classList.add( '__tddMainTitle__' );
        title.innerHTML = "React Base Project Starter Kit | TDD";
    }
}

