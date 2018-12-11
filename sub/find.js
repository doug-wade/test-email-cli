'use strict';

/**
 * Searches generated email addresses that match the given criteria.
 * Usage:
 *     test-email find --ticket MYPROJ/123 --date 2016-11-25
 *     > dwade+2016-11-25-a@indeed.com
 *     > dwade+2016-11-25-b@indeed.com
 */
module.exports = function ({ argv, config, logger, persister }) {
  return new Promise((resolve) => {
    persister.readEmailIndex().then(emailIndex => {
      const { emails } = emailIndex;
      const results = emails
        .filter(email => {
          if(!argv.date) {
            return true;
          }
          return argv.date === email.date;
        })
        .filter(email => {
          if(!argv.ticket) {
            return true;
          }
          return email.ticket === argv.ticket;
        });

      if (results.length < 1) {
        logger.info('no test emails match those criteria');
      } else {
        results.forEach(result => logger.info(JSON.stringify(result)));
      }
      resolve();
    });
  });
};
