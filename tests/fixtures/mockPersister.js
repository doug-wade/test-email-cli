'use strict';

/**
 * Exports a mock persister that matches the api of lib/persister.js, for use
 * when testing.  The write methods do nothing, the read methods return an the
 * most minimal possible response of the correct type (an empty object for
 * config and the current timestamp for lastUpgraded).
 * @type {Object} A mock persister
 */
module.exports = {
  readConfig: function () {
    return new Promise((resolve, reject) => {
      resolve({
        repo: '/Users/dwade/foss/test-email-cli',
        tag: 'tag',
        shell: 'zsh',
        email: 'douglas.b.wade@gmail.com'
      });
    });
  },

  writeConfig: function () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },

  readLastUpgraded: function () {
    return new Promise((resolve, reject) => {
      resolve(new Date());
    });
  },

  writeLastUpgraded: function () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },

  readEmailIndex: function() {
    return new Promise((resolve, reject) => {
      resolve({
        emails: [{
          email: 'doug+2016-11-17-0@dougwade.io',
          date: '2016-11-17',
          labels: ['mine'],
          ticket: '2',
        }]
      })
    })
  },

  writeEmailIndex: function () {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },
};
