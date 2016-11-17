import fs from 'fs';
import spyLogger from '../fixtures/spyLogger';
import mockPersister from '../fixtures/mockPersister';
import test from 'ava';
import sinon from 'sinon';
import sub from '../../lib/sub';
import testemailcli from '../..';

test('Run find command correctly', async t => {
  const argv = { '_': ['find'] };
  const logger = spyLogger();

  await testemailcli({ argv, config: { email: 'doug@dougwade.io', dates: { '2016-11-17': [{ email: 'doug+2016-11-17-1@dougwade.io', date: '2016-11-17' }]}, isValid: () => true }, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('doug+2016-11-17-1@dougwade.io'));
});

test('Run find command using its alias', async t => {
  const argv = { '_': ['f'] };
  const logger = spyLogger();

  await testemailcli({ argv, config: { email: 'doug@dougwade.io', dates: { '2016-11-17': [{ email: 'doug+2016-11-17-1@dougwade.io', date: '2016-11-17' }]}, isValid: () => true }, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('doug+2016-11-17-1@dougwade.io'));
});

test('Find can be filtered by date', async t => {
  const argv = { '_': ['f'], date: '2016-11-16' };
  const logger = spyLogger();

  const config = {
    email: 'doug@dougwade.io',
    dates: {
      '2016-11-17': [{
        email: 'doug+2016-11-17-1@dougwade.io',
        date: '2016-11-17'
      }],
      '2016-11-16': [{
        email: 'doug+2016-11-16-1@dougwade.io',
        date: '2016-11-16'
      }]
    },
    isValid: () => true
  };

  await testemailcli({ argv, config, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('doug+2016-11-16-1@dougwade.io'));
});

test('Find can be filtered by ticket', async t => {
  const argv = { '_': ['f'], ticket: '2' };
  const logger = spyLogger();

  const config = {
    email: 'doug@dougwade.io',
    dates: {
      '2016-11-17': [{
        email: 'doug+2016-11-17-1@dougwade.io',
        ticket: '1',
        date: '2016-11-17'
      }],
      '2016-11-16': [{
        email: 'doug+2016-11-16-1@dougwade.io',
        ticket: '2',
        date: '2016-11-16'
      }]
    },
    isValid: () => true
  };

  await testemailcli({ argv, config, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('doug+2016-11-16-1@dougwade.io'));
});

test('Returns a friendly error when no test emails are found', async t => {
  const argv = { '_': ['f'] };
  const logger = spyLogger();

  await testemailcli({ argv, config: { email: 'doug@dougwade.io', dates: {}, isValid: () => true }, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('no test emails match those criteria'));
});
