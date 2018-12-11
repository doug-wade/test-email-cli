import fs from 'fs';
import spyLogger from '../fixtures/spyLogger';
import mockPersister from '../fixtures/mockPersister';
import mockDateProvider from '../fixtures/mockDateProvider';
import test from 'ava';
import sinon from 'sinon';
import sub from '../../lib/sub';
import testemailcli from '../..';

test('Run generate command correctly', async t => {
  const argv = { '_': ['generate'] };
  const logger = spyLogger();

  await testemailcli({ argv, config: { email: 'doug@dougwade.io', isValid: () => true }, logger, sub: sub({ logger }), dateProvider: mockDateProvider, persister: mockPersister });

  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('doug+2016-11-17-1@dougwade.io'));
});

test('Run generate command using its alias', async t => {
  const argv = { '_': ['g'] };
  const logger = spyLogger();

  await testemailcli({ argv, config: { email: 'doug@dougwade.io', isValid: () => true }, logger, sub: sub({ logger }), dateProvider: mockDateProvider, persister: mockPersister });
  
  t.true(logger.info.calledOnce);
  t.true(logger.info.calledWith('doug+2016-11-17-1@dougwade.io'));
});
