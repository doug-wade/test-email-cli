import test from 'ava';
import c from '../../lib/config';
import mockPersister from '../fixtures/mockPersister';
import spyLogger from '../fixtures/spyLogger';

test('Detects valid config', async t => {
  const logger = spyLogger();
  const config = c({logger, persister: mockPersister, argv: {} });
  const underTest = await config.getConfig();

  t.true(underTest.isValid());
});

test('Detects invalid config', async t => {
  const logger = spyLogger();
  const invalidConfigPersister = {
    readConfig: function () {
      return new Promise((resolve, reject) => {
        resolve({ foo: 'bar' });
      });
    }
  };
  const config = c({logger, persister: invalidConfigPersister, argv: {} });
  const underTest = await config.getConfig();

  t.true(!underTest.isValid());
});
