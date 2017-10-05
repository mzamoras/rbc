/**
 * File: start.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import inquirer from 'inquirer';
import Package from './utilities/Package';
import taketalk from 'taketalk';
import chalk from 'chalk';

taketalk({

    init: function (input, options) {

        this.pack = new Package(input, options);
        this.pack.init();

        if( this.pack.env.needsConfig && this.pack.env.isClient ){
            this.pack.setup();
            return;
        }

        if( !this.pack.client.srcExist && this.pack.env.isClient){
            this.pack.copyTemplateFiles();
            return;
        }

        if( this[input] ){
            this[input]();
        }
        else{
            this.commandSelector();
        }
    },


    commandSelector(){

        inquirer.prompt([
            {
                type   : 'list',
                name   : 'reqCommand',
                message: 'Which process would you like to run ?',
                choices: [ 
                    `Run Server`,
                    `Run Electron App`,
                    `Run Both`,
                    new inquirer.Separator(),
                    `ReConfigure` ,
                    `Delete Configuration and Start Over` ,
                    new inquirer.Separator(),
                    `Compile RBC package | One time`,
                    `Compile RBC package | Watch Mode`,
                    new inquirer.Separator(),
                ],
                default: 0
            },
            {
                type   : 'confirm',
                name   : 'productionServer',
                message: 'Do you want to run in PRODUCTION environment ?',
                default: false,
                when   : answers => {
                    return answers.reqCommand.indexOf("Run") > -1
                }
            },
            {
                type   : 'confirm',
                name   : 'isHot',
                message: 'Run Hot Replacement ?',
                default: true,
                when   : answers => {
                    return answers.reqCommand.indexOf("Run Server") > -1 || answers.reqCommand === "Run Both"
                }
            },
            {
                type   : 'confirm',
                name   : 'isGZip',
                message: 'GZip compiled files ?',
                default: true,
                when   : answers => {
                    return answers.reqCommand.indexOf("Run Server") > -1 || answers.reqCommand === "Run Both"
                }
            },
            {
                type   : 'confirm',
                name   : 'doMinify',
                message: 'Minify compiled files ( compiling may be slower )?',
                default: false,
                when   : answers => {
                    return answers.reqCommand.indexOf("Run Server") > -1 || answers.reqCommand === "Run Both"
                }
            },
            {
                type   : 'confirm',
                name   : 'watch',
                message: 'Watch Mode: Watch for changes ( This is not HotModuleReload )?',
                default: true,
                when   : answers => {
                    return answers.reqCommand.indexOf("Electron") > -1
                }
            }
        ]).then( answers => {

            if( answers.reqCommand.indexOf("Run") > -1){
                let   message   = "Nothing Running";
                const srv       = answers.productionServer ? "PRODUCTION" : "Development";
                const useServer = answers.reqCommand.indexOf( "App" ) < 0 
                const runElectron = answers.reqCommand.indexOf( "App" ) > -1 || answers.reqCommand.indexOf( "Both" ) > -1
                
                this.pack.env.isHot         = answers.isHot;
                this.pack.env.isGZip        = answers.isGZip;
                this.pack.env.doMinify      = answers.doMinify;
                this.pack.env.isProduction  = answers.productionServer;
                this.pack.env.isDevelopment = !answers.productionServer;
                
    
                if( useServer ){
                    this.pack.startServer().then( ()=>{
                        const to = setTimeout( ()=>{
                            if(runElectron){
                                this.pack.runElectronApp();
                            }
                            clearTimeout(to);
                        }, 500 );
                    } );
                }
                else if( !useServer && runElectron){
                    this.pack.runElectronApp( false, answers.watch ); 
                    this.pack.env.doMinify = answers.productionServer;
                }

                this.pack.welcome();
                console.log ( "   ===================================" );
                console.log ( chalk.cyan.bold("          Selected Configuration    ") );
                console.log ( "   ===================================" );
                console.log ( "       Running Server:", useServer ? chalk.green.bold("YES") : chalk.red.bold("NO") );
                console.log ( "     Running Electron:", runElectron ? chalk.green.bold("YES") : chalk.red.bold("NO") );
                console.log ( "           Hot Reload:", answers.isHot ? chalk.green.bold("YES") : chalk.red.bold("NO") );
                console.log ( "           GZip Files:", answers.isGZip ? chalk.green.bold("YES") : chalk.red.bold("NO") );
                console.log ( "       Minified Files:", answers.doMinify ? chalk.green.bold("YES") : chalk.red.bold("NO") );
                console.log ( "          Environment:", srv );
                if( !useServer && runElectron ){
                    console.log ( "     Watching Changes:", answers.watch ? chalk.green.bold("YES") : chalk.red.bold("NO") );
                }
                console.log ( "   ===================================\n" );
                if( !useServer && runElectron ){
                    console.log ( chalk.yellow("   Compiling ...") );
                }
            }
        });
    },

  
    help: 'Help Module!' || function () {
      console.log('Print this when a user wants help.');
    },
  
    version: '0.1.1' || function () {
      console.log('Print this when a user asks for the version.');
    }
  });