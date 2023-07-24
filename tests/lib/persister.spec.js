import test from 'ava';
import p from '../../lib/persister';
import spyLogger from '../fixtures/spyLogger';

const persister = p({logger: spyLogger});

test('Reads and writes lastUpgraded date', async t => {
  const expectedDate = new Date();
  const by = "unit tests";
  await persister.writeLastUpgraded({ date: expectedDate, by });
  const actual = await persister.readLastUpgraded();

  t.is(Date.parse(actual.date), expectedDate.getTime());
  t.is(actual.by, by);
});

// This test doesn't terminate on travis.
test.skip('Reads and writes config', async t => {
  const expectedConfig = { name: "User", "repo": "https://github.com/doug-wade/example-sub"};
  await persister.writeConfig(expectedConfig);
  const actual = await persister.readConfig();

  t.is(actual.name, expectedConfig.name);
  t.is(actual.repo, expectedConfig.repo);
});

test.skip('Reads and writes the email index', async t => {
  const expectedEmailIndex = { emails: [{ email: "douglas.b.wade@gmail.com", date: 1461459266285, ticket: '2', labels: ["mine"] }] };
  await persister.writeEmailIndex(expectedEmailIndex);
  const actual = await persister.readEmailIndex();

  t.is(actual.emails[0].email, expectedEmailIndex.emails[0].email);
  t.is(actual.emails[0].date, expectedEmailIndex.emails[0].date);
  t.is(actual.emails[0].labels[0], expectedEmailIndex.emails[0].labels[0]);
});