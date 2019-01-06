/**
 * File: setup.js | Package: Monoux
 * 
 * Author : Miguel Zamora Serrano <mzamoras@backlogics.com>
 * Created: 11 Sep, 2017 | 12: 50 PM
 * 
 * This file is part of a package and all the information, intellectual
 * and technical concepts contained here are property of their owners.
 * Any kind of use, reproduction, distribution, publication, etc. without
 * express written permission from CapitalMental && BackLogics Technologies
 * is strictly forbidden.
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */

import fs from 'fs';
import fse from 'fs-extra';
import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import messages from '../utilities/messages';

const createQuestion = [
    {
        type   : 'confirm',
        name   : 'setup',
        message: 'Do you want to create it ? ( ./rbc.config.js ) ',
        default: false
    },
    {
        type   : 'confirm',
        name   : 'setupFiles',
        message: 'Do you want to create the folder structure ? ',
        default: false,
        when   : answers => !!answers.setup
    },
];

export default function(){

    const appDirectory   = fs.realpathSync(process.cwd());
    const configFileName = 'rbc.config.js';
    const templateFile   = path.join(__dirname, '../../templates/config.base.js');
    const configFile     = path.resolve(appDirectory,configFileName);
    
    return new Promise( function( resolve, reject ){

        messages.setup.init();
        
        if( !fs.existsSync(configFile) ){
            inquirer.prompt( createQuestion ).then( answers =>{
                if( !answers.setup ){
                    messages.setup.noCreate();
                    reject(false);
                }else{
                    fs.writeFileSync(configFile, fs.readFileSync(templateFile));
                    messages.setup.created(configFile);
                }

                if( answers.setupFiles ){

                    const customConf = require( '../../templates/config.base' );
                    const mainBaseName = path.basename( customConf(false,false).paths.src );
                    const templateStructure = path.join(__dirname, '../../templates/structure');
                    
                    fse.copy( templateStructure, path.join( appDirectory, mainBaseName ) )
                    .then( ()=>console.log( 'ok') )
                    .catch( err => console.log( 'error', e ) );
                }


                messages.setup.noContinue();
                reject();
            } );
        }
        else{
            messages.setup.configFound();
            resolve();
        }

    } );
}
