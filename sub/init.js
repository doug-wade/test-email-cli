'use strict';

const inquirer = require('inquirer');
const exec = require('child_process').exec;
const fs = require('fs');
const untildify = require('untildify');
const path = require('path');

/**
 * Set up configuration for example. Runs interactive commands to walk you through setting up config.
 * Usage:
 *     test-email init
 *     # output from test-email
 */
module.exports = function ({ persister, config }) {
  return new Promise((resolve, reject) => {
    inquirer.prompt([
      {
        name   : 'email',
        message: 'What email address at which you wish to recieve test emails at?'
      }, {
        name   : 'tag',
        message: 'What dist-tag do you want to update from?',
        default: 'stable',
        choices: ['stable', 'latest'],
        type   : 'list',
      }, {
        name   : 'shell',
        message: 'What is your preferred shell?',
        default: 'zsh',
        type   : 'list',
        choices: ['bash', 'zsh']
      }
    ]).then((answers) => {
      Object.keys(answers).forEach((key) => {
        config[key] = answers[key];
      });
      config.dates = config.dates || {};
      persister.writeConfig(config).then(() => {
        let command = 'source ';
        let profile;
        if (answers.shell === 'zsh') {
          command += path.resolve(path.join(__dirname, '..', 'completions', 'test-email-cli.zsh'));
          profile = '.zshrc';
        } else {
          command += path.resolve(path.join(__dirname, '..', 'completions', 'test-email-cli.bash'));
          profile = '.bash_profile';
        }

        fs.appendFile(untildify(path.join('~', profile)), command + '\n', (err) => {
          if (err) {
            reject(e);
          } else {
            exec(command, (execErr) => {
              if (execErr) {
                reject(execErr);
              } else {
                resolve();
              }
            });
          }
        });
      }, reject);
    });
  });
};
