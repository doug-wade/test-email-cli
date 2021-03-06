import fs from 'fs';
import spyLogger from '../fixtures/spyLogger';
import mockPersister from '../fixtures/mockPersister';
import test from 'ava';
import sinon from 'sinon';
import sub from '../../lib/sub';
import testemailcli from '../..';

test('Lists commands properly', async t => {
  const argv = { '_': ['commands'] };
  const logger = spyLogger();

  await testemailcli({ argv, logger, sub: sub({ logger }), persister: mockPersister });

  t.true(logger.random.called);
  fs.readdirSync(__dirname + '/../../sub').forEach(function (subcommand) {
    t.true(logger.random.calledWithMatch(subcommand.replace('.js', '')));
  });
});
