/**
 * File: Package.js | Package: React Base Starter Project
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
import inquirer from 'inquirer';
import rx from 'rx-lite-aggregates'; 
import browserSyncServer from 'browser-sync';
import webpack from 'webpack';
import gzipConnect from 'connect-gzip-static';
import DataCollector from './DataCollector';
import { exec } from 'child_process';

export default class Package extends DataCollector{

    constructor(input, options){
        super(input, options)
    }

    init(){
        if( this.env.isClient && this.env.needsConfig ){
            console.log( 'Configuring' );
        }
    }

    setup(){
        const observe = rx.Observable.create( function(obs) {
            
              obs.onNext({
                type   : 'input',
                name   : 'projectName',
                message: ' Project Name ?',
                default: "New Project"
              });
        
              obs.onNext({
                type   : 'input',
                name   : 'projectAddress',
                message: ' Project local address and port ?',
                default: "http://localhost:5001"
              });
        
              obs.onNext({
                type   : 'confirm',
                name   : 'useProxy',
                message: ' Do you want to use a proxy ?',
                default: false
              });
        
              obs.onNext({
                type   : 'input',
                name   : 'proxyAddress',
                message: ' Proxy address and port?',
                default: "http://example.com:80",
                when   : ( ({ useProxy }) => useProxy )
              });
        
              obs.onNext({
                type   : 'confirm',
                name   : 'autoOpenChrome',
                message: ' Auto open chrome when serving ?',
                default: true
              });
        
              obs.onCompleted();
        });

        inquirer.prompt(observe).then( answers => {
            const data       = fse.readFileSync(this.rbc.configTemplate,{ encoding:"utf8" });
            const clientConf = data
            .replace( /\%PROJECT_NAME\%/g, answers.projectName )
            .replace( /\%LOCAL_ADDRESS\%/g, answers.projectAddress )
            .replace( /\%PROXY_ADDRESS\%/g, answers.useProxy ? answers.proxyAddress : answers.projectAddress )
            .replace( /\/\/USE_PROXY\/\//g, answers.useProxy ? "" : "//" )
            .replace( /false\,\/\/OPEN_CHROME\/\//g, answers.autoOpenChrome ? "true" : "false" );

            fse.outputFileSync(this.client.configFilePath, clientConf); 
            
        });
    }

    copyTemplateFiles(){

        const observe = rx.Observable.create( obs => {
              obs.onNext({
                type   : 'confirm',
                name   : 'copy',
                message: ' Copy template files based on your ( rbc.config.js ) configuration file ?',
                default: false
              });

              obs.onNext({
                type   : 'confirm',
                name   : 'viewBlade',
                message: ' Since your project has a proxy,\n Would you like to use php blade file for index template ( app.blade.php ) ? \nNote:( For Laravel Usage ) ?',
                default: false,
                when   : answers => answers.copy && !!this.client.configFileData.base.proxyURL
              });
        
              obs.onCompleted();
        });

        inquirer.prompt(observe).then( answers => {
            if(answers.copy){
                fse.copySync(this.rbc.templates_assets, path.resolve(this.client.configFileData.paths.src, "assets"));
                fse.copySync(this.rbc.templates_react, path.resolve(this.client.configFileData.paths.src, "react"));
                fse.copySync(this.rbc.templates_electron, path.resolve(this.client.configFileData.paths.src, "electron"));
                fse.copySync(this.rbc.templates_storybook, path.resolve(this.client.configFileData.paths.src, "storybook"));
                fse.copySync(this.rbc.templates_public, this.client.configFileData.paths.dest);

                if( answers.viewBlade){
                    fse.copySync(this.rbc.templates_views, path.resolve(this.client.configFileData.paths.src, "views"));
                }
                
                console.log( 'Templates Copied');
            }
            else{
                console.log( 'Nothing Copied');
            }
        });
    }

    startServer(){
        return new Promise( (resolve, reject) =>{
            
            const wpConf = this.wpConfig( this.env.isProduction, this.env.isHot, this.env.isGZip, this.env.doMinimize, this.client.configFileData );
            const bsConf = this.bsConfig( this.env.isProduction, this.env.isHot, this.client.configFileData, this.env.isGZip, webpack( wpConf ) );
    
            const browserSync = browserSyncServer.create( 'mainBrowserSyncServer' );
            
            browserSync.init( bsConf, ( err, bs ) =>{
    
                if( this.env.isProduction || this.env.isGzip){
                    bs.addMiddleware( "*", gzipConnect, {
                        override: true
                    } );
                }
    
                if ( err ) return console.log( err );
                resolve();
            });
        } );
    }

    runElectronApp( isUsingServer = true, watch = false ){
        if( !isUsingServer ){
            let   initialized  = false;
            const wpConf       = this.wpConfig( this.env.isProduction, false, false, this.env.isProduction, this.client.configFileData );
            const compiler     = webpack( wpConf );
            const statsConf    = {colors: true,chunks: false,modules: false, children: false, hash: false};
            const errorManager = err => { 
                if(err) console.log( err );
                return !!err;
            };
            const printStats  = stats => console.log( stats.toString(statsConf) );
            const compileFunc = (err, stats) => {
                if (errorManager(err)) { return; }
                this.welcome();
                console.log("\n");
                printStats( stats );
                if(!initialized){
                    console.log(chalk.yellow("\nOpening App ..."));
                    exec("npm run rbc::electron");
                    initialized = true;
                }
                if ( watch ){
                    console.log(chalk.yellow("\nWaiting for changes ... "));
                }
                else{
                    console.log(chalk.dim("\nTo quit app: ctrl + c    ( here on console ) \n             command + q ( on the app window ) "));
                }
            };

            compiler[ watch ? 'watch' : 'run' ]( 
                watch ? {}         : compileFunc,
                watch ? compileFunc: null
            );
            return;
        }
        
        exec("npm run rbc::electron");
    }
}