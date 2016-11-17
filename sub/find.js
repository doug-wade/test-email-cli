'use strict';

/**
 * Searches generated email addresses that match the given criteria.
 * Usage:
 *     test-email find --ticket MYPROJ/123 --date 2016-11-25
 *     > dwade+2016-11-25-a@indeed.com
 *     > dwade+2016-11-25-b@indeed.com
 */
module.exports = function ({ argv, config, logger }) {
  return new Promise((resolve) => {
    let dates = config.dates;
    let results = [];

    if (argv.date) {
      dates = { [argv.date]: config.dates[argv.date] || [] };
    }
    Object.keys(dates).forEach(date => {
      const f = dates[date]
        .filter(entry => {
          if (!argv.ticket) {
            return true;
          }
          if (!entry.ticket) {
            return false;
          }
          if (entry.ticket.includes(argv.ticket)) {
            return true;
          }
        })
        .map(entry => entry.email);
      results = results.concat(f);
    });

    if (results.length < 1) {
      logger.info('no test emails match those criteria');
    } else {
      results.forEach(logger.info);
    }
    resolve();
  });
};
