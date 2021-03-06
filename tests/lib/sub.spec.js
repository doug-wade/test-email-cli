import test from 'ava';
import s from '../../lib/sub';
import spyLogger from '../fixtures/spyLogger';

const logger = spyLogger();
const sub = s({ logger });

test('Gets commands correctly', async t => {
  const commands = await sub.get();

  t.is(commands.size, 8);
});

test('Gets a command from an alias correctly', async t => {
  const command = await sub.normalize('f');

  t.is(command, 'find');
});

test('Gets a command from an command correctly', async t => {
  const command = await sub.normalize('help');

  t.is(command, 'help');
});
