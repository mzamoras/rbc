"use strict";

var _inquirer = _interopRequireDefault(require("inquirer"));

var _Package = _interopRequireDefault(require("./utilities/Package"));

var _taketalk = _interopRequireDefault(require("taketalk"));

var _chalk = _interopRequireDefault(require("chalk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * File: start.js | Package: React Base Starter Project
 * 
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree
 * 
 * CapitalMental && BackLogics Technologies
 * Copyright 2014-present. | All rights reserved.
 */
(0, _taketalk.default)({
  init: function init(input, options) {
    this.pack = new _Package.default(input, options);
    this.pack.init();

    if (this.pack.env.needsConfig && this.pack.env.isClient) {
      this.pack.setup();
      return;
    }

    if (!this.pack.client.srcExist && this.pack.env.isClient) {
      this.pack.copyTemplateFiles();
      return;
    }

    if (this[input]) {
      this[input]();
    } else {
      this.commandSelector();
    }
  },
  commandSelector: function commandSelector() {
    var _this = this;

    _inquirer.default.prompt([{
      type: 'list',
      name: 'reqCommand',
      message: 'Which process would you like to run ?',
      choices: ['Run Server', 'Run Electron App', 'Run Both', new _inquirer.default.Separator(), 'Storybook', 'Test with Karma', 'Test with Karma | Watch Mode', 'Test with Jest', 'Test with Jest | Watch Mode', new _inquirer.default.Separator(), 'ReConfigure', 'Delete Configuration and Start Over', new _inquirer.default.Separator(), 'Compile RBC package | One time', 'Compile RBC package | Watch Mode', new _inquirer.default.Separator()],
      default: 0
    }, {
      type: 'confirm',
      name: 'productionServer',
      message: 'Do you want to run in PRODUCTION environment ?',
      default: false,
      when: function when(answers) {
        return answers['reqCommand'].indexOf('Run') > -1;
      }
    }, {
      type: 'confirm',
      name: 'isHot',
      message: 'Run Hot Replacement ?',
      default: true,
      when: function when(answers) {
        return answers['reqCommand'].indexOf('Run Server') > -1 || answers['reqCommand'] === 'Run Both';
      }
    }, {
      type: 'confirm',
      name: 'isGZip',
      message: 'GZip compiled files ?',
      default: true,
      when: function when(answers) {
        return answers['reqCommand'].indexOf('Run Server') > -1 || answers['reqCommand'] === 'Run Both';
      }
    }, {
      type: 'confirm',
      name: 'doMinify',
      message: 'Minify compiled files ( compiling may be slower )?',
      default: false,
      when: function when(answers) {
        return answers['reqCommand'].indexOf('Run Server') > -1 || answers['reqCommand'] === 'Run Both';
      }
    }, {
      type: 'confirm',
      name: 'watch',
      message: 'Watch Mode: Watch for changes ( This is not HotModuleReload )?',
      default: true,
      when: function when(answers) {
        return answers['reqCommand'].indexOf('Electron') > -1;
      }
    }]).then(function (answers) {
      if (answers['reqCommand'].indexOf('Run') > -1) {
        var message = 'Nothing Running'; //eslint-disable-line

        var srv = answers['productionServer'] ? 'PRODUCTION' : 'Development';
        var useServer = answers['reqCommand'].indexOf('App') < 0;
        var runElectron = answers['reqCommand'].indexOf('App') > -1 || answers['reqCommand'].indexOf('Both') > -1;
        _this.pack.env.isHot = answers.isHot;
        _this.pack.env.isGZip = answers.isGZip;
        _this.pack.env.doMinify = answers.doMinify;
        _this.pack.env.isProduction = answers['productionServer'];
        _this.pack.env.isDevelopment = !answers['productionServer'];

        if (useServer) {
          _this.pack.startServer(runElectron);
        } else if (!useServer && runElectron) {
          _this.pack.runElectronApp(false, answers.watch);

          _this.pack.env.doMinify = answers['productionServer'];
        }

        _Package.default.welcome();

        console.log('   ===================================');
        console.log(_chalk.default.cyan.bold('          Selected Configuration    '));
        console.log('   ===================================');
        console.log('       Running Server:', useServer ? _chalk.default.green.bold('YES') : _chalk.default.red.bold('NO'));
        console.log('     Running Electron:', runElectron ? _chalk.default.green.bold('YES') : _chalk.default.red.bold('NO'));
        console.log('           Hot Reload:', answers.isHot ? _chalk.default.green.bold('YES') : _chalk.default.red.bold('NO'));
        console.log('           GZip Files:', answers.isGZip ? _chalk.default.green.bold('YES') : _chalk.default.red.bold('NO'));
        console.log('       Minified Files:', answers.doMinify ? _chalk.default.green.bold('YES') : _chalk.default.red.bold('NO'));
        console.log('          Environment:', srv);

        if (!useServer && runElectron) {
          console.log('     Watching Changes:', answers.watch ? _chalk.default.green.bold('YES') : _chalk.default.red.bold('NO'));
        }

        console.log('   ===================================\n');

        if (!useServer && runElectron) {
          console.log(_chalk.default.yellow('   Compiling ...'));
        }
      }

      if (answers['reqCommand'].indexOf('Test') > -1 || answers['reqCommand'].indexOf('Storybook') > -1) {
        _Package.default.runTest(answers['reqCommand']);
      }

      if (answers['reqCommand'].indexOf('Compile') > -1) {
        _Package.default.runRecompile(answers['reqCommand']);
      }

      if (answers['reqCommand'].indexOf('Config') > -1) {
        _this.pack.runReset(answers['reqCommand']);
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