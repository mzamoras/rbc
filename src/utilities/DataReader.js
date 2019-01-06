/**
 * File: DataReader.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import fse from 'fs-extra';
import path from 'path';

export default class DataReader{
    
    static get paths(){

        const rbcPath    = path.resolve( __dirname, '../../' );
        const clientPath = path.resolve( rbcPath, '../../' );
        const jsonName   = 'package.json';
        const confName   = 'rbc.config.js';

        return{
            client      : clientPath,
            rbc         : rbcPath,
            clientJson  : path.resolve( clientPath, jsonName ),
            clientConfig: path.resolve( clientPath, confName ),
            rbcJson     : path.resolve( rbcPath, jsonName )
        }
    }

    static get json(){

        const { rbcJson, clientJson } = DataReader.paths;

        return{
            rbc   : fse.readJsonSync( rbcJson, { throws: false } ) || null,
            client: fse.readJsonSync( clientJson, { throws: false } ) || null,
        }
    }

    static get config(){
        const { clientConfig } = DataReader.paths;
        const hasConfig        = fse.pathExistsSync( clientConfig );
    
        return hasConfig ?  require( clientConfig )( false, false ): {};
    }

    get newPackageJson(){

        this._oldPackageJson = this._oldPackageJson || DataReader.json.client || null;
        
        if( !this._oldPackageJson ){
            console.log( 'Couldn\'t find package.json file in ', DataReader.paths.clientJson );
            return;
        }

        if( !this._newPackageJson ){
            this._newPackageJson = Object.assign( {}, {...this._oldPackageJson} );
        }

        return this._newPackageJson;
    }

    constructor(){
        this.prefix          = 'rbc::';
        this._newPackageJson = null;
        this._oldPackageJson = null;
    }

    insertInClientPackageJsonKey( key, name, value ){
        if( key ){
            if( !this.newPackageJson[key] ){
                this.newPackageJson[key] = {};
            }
            this.newPackageJson[key][name] = value;
            return;
        }
        this.newPackageJson[name] = value;
    }

    insertCommentOnClientJson(key, title, value = ''){

        if( !this.newPackageJson[key] ){
            this.newPackageJson[key] = {};
        }

        const titleFixed = title.replace('//','');
        this.newPackageJson[key]['// ' + titleFixed] = value;
    }



    addClientScript( scriptName, script, prefix = this.prefix ){
  
        this.newPackageJson.scripts = this.newPackageJson.scripts || {};

        if( typeof script !== 'string' ){
            for (let key in script) {
                if (script.hasOwnProperty(key)) {
                    const pref = key.indexOf('//') > -1 ? '//' : prefix;
                    this.addClientScript( key, script[key], pref );
                }
            }
        }
        else{
            if( scriptName.indexOf('//') > -1 ){
                this.insertCommentOnClientJson( 'scripts', scriptName, script );
            }
            else{
                this.insertInClientPackageJsonKey( 'scripts', `${prefix}${scriptName}`, script );
            }
        }

    }

    saveClientPackageJson(){
        fse.writeJSONSync( DataReader.paths.clientJson, this.newPackageJson, { spaces: 4 } );
    }
}
