/**
 * File: MainManager.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import path from 'path';
import fse from 'fs-extra';
import chalk from 'chalk';

const emptyFunc = () => false;

export default class DataCollector{
    
    constructor(input, options) {

        this.input   = input;
        this.options = options;

        this.messages = {};

        this.fileNames = {
            configFile    : "rbc.config.js",
            configTemplate: "config.base.js"
        }

        this.env = {
            isHot        : false,
            isProduction : false,
            isDevelopment: true,
            needsConfig  : true,
            isClient     : false,
        }

        this.client = {
            path           : null,
            packageJsonData: null,
            packageJsonPath: null,
            configFileData : null,
            configFilePath : null
        }

        this.rbc = {
            path           : null,
            packageJsonData: null,
            packageJsonPath: null,
            templatesPath  : null,
            defaultConfigWP: null,
            defaultConfigBS: null
        }
        
        this.welcome();
        this.boot();
    }

    boot(){
        const optKeys = Object.keys( this.options );
        

        //Environment
        this.env.isProduction  = optKeys.includes("production") || optKeys.includes("production-hot");
        this.env.isHot         = optKeys.includes("hot") || optKeys.includes("production-hot");
        this.env.isDevelopment = !this.env.isProduction;
        this.env.isGZip        = true;
        
        //Client
        this.client.path            = path.resolve( process.cwd() );
        this.client.packageJsonPath = path.resolve( this.client.path, "package.json" );
        this.client.packageJsonData = fse.readJSONSync( this.client.packageJsonPath, { throws: false } );
        this.client.configFilePath  = path.resolve( this.client.path, this.fileNames.configFile );
        this.client.configFileData  = fse.pathExistsSync( this.client.configFilePath )
                                        ? require( this.client.configFilePath )(this.env.isProduction, this.env.isHot) 
                                                                                                                                                            :             null ;
                                        this.client.srcExist = this.client.configFileData ? fse.pathExistsSync( this.client.configFileData.paths.src )      : false;
                                        this.client.srcExist = this.client.configFileData ? fse.pathExistsSync( this.client.configFileData.paths.src_react ): false;

        //Rbc
        this.rbc.path                = path.resolve( __dirname, "../../" );
        this.rbc.templatesPath       = path.resolve( this.rbc.path, "templates" );
        this.rbc.templates_structure = path.resolve( this.rbc.templatesPath, "structure" );
        this.rbc.templates_assets    = path.resolve( this.rbc.templates_structure, "assets" );
        this.rbc.templates_views     = path.resolve( this.rbc.templates_structure, "views" );
        this.rbc.templates_electron  = path.resolve( this.rbc.templates_structure, "electron" );
        this.rbc.templates_storybook = path.resolve( this.rbc.templates_structure, "storybook" );
        this.rbc.templates_react     = path.resolve( this.rbc.templates_structure, "react" );
        this.rbc.templates_public    = path.resolve( this.rbc.templates_structure, "public" );
        this.rbc.configTemplate      = path.resolve( this.rbc.templatesPath, this.fileNames.configTemplate );
        this.rbc.packageJsonPath     = path.resolve( this.rbc.path, "package.json" );
        this.rbc.packageJsonData     = fse.readJSONSync( this.rbc.packageJsonPath, { throws: false } );

        this.defaultConfigWP     = path.resolve( this.rbc.path , 'dist/config/wp.config.js' );
        this.defaultConfigBS     = path.resolve( this.rbc.path , 'dist/config/bs.config.js' );
        this.defaultConfigBabel  = path.resolve( this.rbc.path , 'dist/config/babel.config.js' );
        this.defaultConfigEslint = path.resolve( this.rbc.path , 'dist/config/eslint.config.js' );


        
        this.wpConfig = this.client.configFileData ? require( this.defaultConfigWP ).default : emptyFunc;
        this.bsConfig = this.client.configFileData ? require( this.defaultConfigBS ).default : emptyFunc;
        
        this.env.isClient    = this.rbc.path !== this.client.path;
        this.env.needsConfig = !this.client.configFileData;

    }

    //
    // ─── MESSAGES ───────────────────────────────────────────────────────────────────
    //


    setMessages(){

        const nr   = chalk.cyan;
        const nrb  = nr.bold;
        const prod = chalk.red.bold;
        const dev  = chalk.magenta.bold;

        return{
            title: nrb("REACT BASE COMPONENTS")
        }
    }

    
    welcome(){
        this.clearConsole();
        const spacing = "                ";
        console.log(
            "+-------------------------------------------------------+\n" +
            chalk.dim("|",spacing) + chalk.cyan.bold("REACT BASE COMPONENTS") + chalk.dim(spacing,"|") + "\n" +
            "+-------------------------------------------------------+"
        );
    }


    clearConsole(){
        process.stdout.write(
            process.platform === 'win32' ? '\x1Bc': '\x1B[2J\x1B[3J\x1B[H'
        );
    }

}