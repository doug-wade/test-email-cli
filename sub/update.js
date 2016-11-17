'use strict';

const exec = require('child_process').exec;

/**
 * Updates test-email by installing the most recent version of the npm package.
 * Usage:
 *     test-email update
 *     # output from npm
 */
module.exports = function ({ config, logger }) {
  return new Promise(function (resolve, reject) {
    exec(`npm install -g test-email-cli@${config.tag}`, (err, stdout) => {
      if (err) {
        logger.error(err);
        reject(err);
      } else {
        logger.info(stdout);
        resolve();
      }
    });
  });
};
