
import clearConsole from 'react-dev-utils/clearConsole';
import {defaultHeader} from './newScripts/packMessages';
import app from 'commander';
import SetupController from './newScripts/SetupController';
app.version('0.0.2');
//
const setupControll = new SetupController();

if( !setupControll.setUpIsDone ){
    clearConsole();
    defaultHeader();
    console.log('Set up first');
    process.exit();
}
app.on('command:*', function () {
    clearConsole();
    defaultHeader();
    console.error('Invalid command: %s\nSee --help for a list of available commands.', app.args.join(' '));
    //process.exit(1);
});

app.parse(process.argv);
if (!app.args.length) app.help();
//process.exit(1);
// clearConsole();
// defaultHeader();
//console.log('STARTING ツ ¯\\_(^-^)_/¯  \\{^‿^}/   ¯\\{^‿^}/¯');
/*console.log('STARTING ツ ¯\\_(^-^)_/¯  \{^‿^}/');
console.log(boxen( `${packageName} | v${packageVersion} \n${packageRepo}`, {
    padding: 1,
    //borderStyle: 'round',
    dimBorder: true,
    borderColor: 'cyan',
    align: 'center',
    margin: 1
}));*/

// welcome
// check for initialized
    // copy config file
    // files and templates

// options
    // run server node
    // run classic browser sync
