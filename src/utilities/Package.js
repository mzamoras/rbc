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
import rimraf from 'rimraf';
import glob from 'glob';
import chalk from 'chalk';
import inquirer from 'inquirer';
import {Observable} from 'rxjs';
import browserSyncServer from 'browser-sync';
import webpack from 'webpack';
import gzipConnect from 'connect-gzip-static';
import DataCollector from './DataCollector';
import { exec, spawnSync } from 'child_process';

export default class Package extends DataCollector{

    init(){
        if( this.env.isClient && this.env.needsConfig ){
            console.log( 'Configuring' );
        }
    }

    setup(){
        const observe = Observable.create( function(obs) {
            
              obs.next({
                type   : 'input',
                name   : 'projectName',
                message: ' Project Name ?',
                default: 'New Project'
              });
        
              obs.next({
                type   : 'confirm',
                name   : 'isLocalhost',
                message: ' Use localhost to serve the project ?',
                default: true
              });

              obs.next({
                type   : 'confirm',
                name   : 'isHttps',
                message: ' Use secure server to serve the project ( https:// ) ?',
                default: false
              });

              obs.next({
                type   : 'input',
                name   : 'localAddress',
                message: ' Address or IP to serve the project ?',
                default: 'localhost',
                when   : ( ({ isLocalhost }) => !isLocalhost )
              });

              obs.next({
                type   : 'input',
                name   : 'localPort',
                message: ' Local Port?',
                default: '5001'
              });
        
              obs.next({
                type   : 'confirm',
                name   : 'useProxy',
                message: ' Do you want to use a proxy ?',
                default: false
              });
        
              obs.next({
                type   : 'input',
                name   : 'proxyAddress',
                message: ' Proxy address and port?',
                default: 'http://example.com:80',
                when   : ( ({ useProxy }) => useProxy )
              });
        
              obs.next({
                type   : 'confirm',
                name   : 'autoOpenChrome',
                message: ' Auto open chrome when serving ?',
                default: false
              });
        
              obs.complete();
        });

        inquirer.prompt(observe).then( answers => {
            const data           = fse.readFileSync(this.rbc.configTemplate,{ encoding:'utf8' });
            const address        = answers['isLocalhost'] ? 'localhost' : answers['localAddress'];
            const protocol       = answers['isHttps'] ? 'https' : 'http';
            const projectAddress = `${protocol}://${address}:${answers.localPort}`;
            const clientConf     = data
            .replace( /%PROJECT_NAME%/g, answers.projectName )
            .replace( /%LOCAL_ADDRESS%/g, projectAddress )
            .replace( /%PROXY_ADDRESS%/g, answers.useProxy ? answers['proxyAddress'] : projectAddress )
            .replace( /\/\/USE_PROXY\/\//g, answers.useProxy ? '' : '//' )
            .replace( /false,\/\/OPEN_CHROME\/\//g, answers.autoOpenChrome ? 'true' : 'false' )
            .replace( /true,\/\/USE_STATIC\/\//g, answers.useProxy ? 'false' : 'true' );

            fse.outputFileSync(this.client.configFilePath, clientConf);
        });
    }

    copyTemplateFiles(){

        const observe = Observable.create( obs => {
              obs.next({
                type   : 'confirm',
                name   : 'copy',
                message: ' Copy template files based on your ( rbc.config.js ) configuration file ?',
                default: false
              });

              obs.next({
                type   : 'confirm',
                name   : 'viewBlade',
                message: ' Since your project has a proxy,\n Would you like to use php blade file for index template ( app.blade.php ) ? \nNote:( For Laravel Usage ) ?',
                default: false,
                when   : answers => answers.copy && !!this.client.configFileData.base['proxyURL']
              });
        
              obs.complete();
        });

        inquirer.prompt(observe).then( answers => {
            if(answers.copy){
                fse.copySync(this.rbc.templates_assets, path.resolve(this.client.configFileData.paths.src, 'assets'));
                fse.copySync(this.rbc.templates_react, path.resolve(this.client.configFileData.paths.src, 'react'));
                fse.copySync(this.rbc.templates_electron, path.resolve(this.client.configFileData.paths.src, 'electron'));
                fse.copySync(this.rbc.templates_storybook, path.resolve(this.client.configFileData.paths.src, 'storybook'));
                fse.copySync(this.rbc.templates_public, this.client.configFileData.paths.dest);

                if( answers['viewBlade']){
                    fse.copySync(this.rbc.templates_views, path.resolve(this.client.configFileData.paths.src, 'views'));
                }
                
                console.log( 'Templates Copied');
            }
            else{
                console.log( 'Nothing Copied');
            }
        });
    }

    startServer( runElectron = false ){

            
        const electronCallBack = !runElectron ? null : ()=>{
            this.runElectronApp();
        };

        //Delete old files
        this.deleteOldPublicFiles();

        const wpConf = this.wpConfig( this.env.isProduction, this.env.isHot, this.env.isGZip, this.env.doMinimize, this.client.configFileData );
        const bsConf = this.bsConfig( this.env.isProduction, this.env.isHot, this.client.configFileData, this.env.isGZip, webpack( wpConf ), electronCallBack );

        const browserSync = browserSyncServer.create( 'mainBrowserSyncServer' );
        
        browserSync.init( bsConf, ( err, bs ) =>{

            if( this.env.isProduction || this.env.isGZip){
                bs.addMiddleware( '*', gzipConnect( this.client.configFileData.paths.dest ), {
                    override: true
                } );
            }
            if ( err ) return console.log( err );
        });

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
                Package.welcome();
                console.log('\n');
                printStats( stats );
                if(!initialized){
                    console.log(chalk.yellow('\nOpening App ...'));
                    exec('npm run rbc::electron');
                    initialized = true;
                }
                if ( watch ){
                    console.log(chalk.yellow('\nWaiting for changes ... '));
                }
                else{
                    console.log(chalk.dim('\nTo quit app: ctrl + c    ( here on console ) \n             command + q ( on the app window ) '));
                }
            };

            compiler[ watch ? 'watch' : 'run' ]( 
                watch ? {}         : compileFunc,
                watch ? compileFunc: null
            );
            return;
        }
        
        exec('npm run rbc::electron');
    }

    static runTest(comm ){
        const watch = comm.indexOf('Watch') > -1;
        let select = '';

        if( comm.indexOf('Karma') > -1){
            select = watch ? 'rbc::karmaWatch' : 'rbc::karma';
        }
        else if( comm.indexOf('Jest') > -1 ){
            select = watch ? 'rbc::jestWatch' : 'rbc::jest';

        }
        else{
            select = 'rbc::storybook';
        }

        spawnSync('npm',[
            'run',
            select
        ], { stdio:'inherit' });

    }

    static runRecompile(comm ){
        const watch = comm.indexOf('Watch') > -1;
        spawnSync('npm',[
            'run',
            watch ? 'rbc::recompileW' : 'rbc::recompile'
        ], { stdio:'inherit' });
    }

    runReset( comm ){

        const reset = comm.indexOf('Delete') > -1;
        
        if( reset ){
            console.log( chalk.red.bold('\n -------------------------------------') );
            console.log( chalk.red.bold(' I M P O R T A N T :') );
            console.log( chalk.red.bold(' This could potentially lead to loss of') );
            console.log( chalk.red.bold(' your important files. All Folders created ') );
            console.log( chalk.red.bold(' with this tool will be deleted. Be sure to') );
            console.log( chalk.red.bold(' backup your important files first.') );
            console.log( chalk.red.bold(' -------------------------------------\n') );
        }
        else{
            console.log( chalk.red.bold('\n -------------------------------------') );
            console.log( chalk.red.bold(' I M P O R T A N T :') );
            console.log( chalk.red.bold(' This will delete your configuration file') );
            console.log( chalk.red.bold(' if you are unsure of this make a backup ') );
            console.log( chalk.red.bold(' of this file first.') );
            console.log( chalk.red.bold(' -------------------------------------\n') );
        }

        const observe = Observable.create( obs => {
            obs.next({
                type   : 'confirm',
                name   : 'config',
                message: chalk.red.bold(' Are you sure you want to delete your configuration file ( rbc.config.js ) ?'),
                when: !reset,
                default: false,
            });

            obs.next({
                type   : 'confirm',
                name   : 'reset',
                message: chalk.red.bold(' Are you sure you want to delete your configuration file and template files ?'),
                default: false,
                when   : reset
            });
        
            obs.complete();
        });

        inquirer.prompt(observe).then( answers => {
            if( !!answers.reset ){
                
                const files = glob.sync('**/*.*', {
                    cwd: this.rbc.templatesPath
                }) || [];

                files.push( this.client.configFilePath );
                
                files.forEach( f =>{
                    const fName = f.replace('structure/', this.client.configFileData.paths.src + '/');
                    try{
                        fse.unlinkSync( fName );
                        console.log( chalk.yellow('Deleted'), chalk.dim(fName));
                    }
                    catch(e){}
                } );

                rimraf( path.resolve(this.client.configFileData.paths.src, 'react'), ()=>{} );
                rimraf( path.resolve(this.client.configFileData.paths.src, 'electron'), ()=>{} );
                rimraf( path.resolve(this.client.configFileData.paths.src, 'storybook'), ()=>{} );
                rimraf( path.resolve(this.client.configFileData.paths.src, 'public'), ()=>{} );

                return;
            }

            if( !!answers.config ){
                try{
                    fse.unlinkSync( this.client.configFilePath);
                    console.log( chalk.yellow('Deleted'), chalk.dim(this.client.configFilePath));
                }
                catch(e){}
                return;

            }
            
            console.log( chalk.yellow('Nothing was deleted!!') );
        });
    }

    deleteOldPublicFiles(){
        const destPath = this.client.configFileData.paths.dest;
        const emptyFunc = ()=>{};
        rimraf( path.resolve(destPath, 'css'), emptyFunc );
        rimraf( path.resolve(destPath, 'js'), emptyFunc );
        rimraf( path.resolve(destPath, 'images'), emptyFunc );
        rimraf( path.resolve(destPath, 'fonts'), emptyFunc );
    }
}