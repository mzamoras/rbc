
import clearConsole from 'react-dev-utils/clearConsole';
import path from 'path';
import boxen from 'boxen';
import fs from 'fs-extra';
import chalk from 'chalk';

const DEV = 'developing';
const CHG = 'changing';
const WKG = 'working';
const CONFIG_NAME = 'rbc.config.js';
const NODE_MODULES_NAME = 'node_modules';

// some-pack/node_modules/react-base-starter-project/dist/newScripts

function getPackPath(){
    return path.resolve(__dirname, '../..');
}

function getParentPath(){
    return path.resolve(getPackPath(), '../..');
}

function getConfigPath(){
    return path.resolve( getParentPath(), CONFIG_NAME );
}

function doesConfigFileExist(){
    return amImplemented() && fs.pathExistsSync(getConfigPath());
}

function getConfigDataFunction(){
    if( !amImplemented() || !doesConfigFileExist()) {
        return function(){
            return {};
        };
    }
    return require(CONFIG_NAME);
}


function amIANodePackage(){
    const data = getOwnJson();
    const packName = data['name'];
    const nodeModPath = path.resolve( getPackPath(), '..' );
    return path.basename(getPackPath()) === packName && path.basename(nodeModPath) === NODE_MODULES_NAME;
}

function amImplemented(){
    return  getParentPath() === process.cwd() && amIANodePackage();

}

function getOwnJson(){
    return JSON.parse(fs.readFileSync('package.json', 'utf8'));
}

export function defaultHeader(){
    const data = getOwnJson();
    const name = data ? data['showName'] : 'React Base Starter Project';
    const version = data ? data['version'] : 'Latest';
    //const repo = data ? data['repository']['url'] : '';
    //console.log('exist', amIANodePackage() );
    const packName = chalk.cyan(`${name} | v${version}`);

    console.log(boxen( packName, {
        padding: 1,
        //borderStyle: 'round',
        dimBorder: true,
        borderColor: 'cyan',
        align: 'center',
        margin: 1
    }));
}