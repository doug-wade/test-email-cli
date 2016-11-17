'use strict';

/**
 * Generates a new test email address.  Provide a ticket with the ticket
 * argument for later search.
 * Usage:
 *     test-email generate --ticket MYPROJ/123
 *     > dwade+2016-11-15-c@indeed.com
 */
module.exports = function ({ argv, config, logger, dateProvider, persister }) {
  return new Promise((resolve, reject) => {
    const date = dateProvider().toString();
    const [user, domain] = config.email.split('@');

    if (!config.dates[date]) {
      config.dates[date] = [];
    }

    const email = `${user}+${date}-${config.dates[date].length.toString(36)}@${domain}`;
    config.dates[date].push({ email, date, ticket: argv.ticket });
    logger.info(email);
    persister.writeConfig(config).then(resolve, reject);
  });
};
