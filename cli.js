#!/usr/bin/env node
'use strict';


const minimist = require('minimist');
const argv = minimist(process.argv.slice(2), {
  boolean: true,
});

const dateProvider = require('./lib/dateProvider.js');
const log = require('./lib/logger');
const logger = log.getLogger(log.getLevelFromArgv(argv));
process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled error: ' + reason);
});

const persister = require('./lib/persister')({argv, logger});
require('./lib/config')({argv, logger, persister}).getConfig().then((config) => {
  const sub = require('./lib/sub')({argv, logger, persister, config});

  const testemailcli = require('.');

  logger.debug('process.argv: ' + JSON.stringify(argv));

  testemailcli({ argv, config, dateProvider, logger, persister, sub }).then((result) => {
    process.exit(result); // eslint no-process-exit:0
  });
}, (err) => {
  logger.error('failed to bootstrap config with error: ', err);
});
