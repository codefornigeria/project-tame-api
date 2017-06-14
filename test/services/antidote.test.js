const assert = require('assert');
const app = require('../../src/app');

describe('\'antidote\' service', () => {
  it('registered the service', () => {
    const service = app.service('antidote');

    assert.ok(service, 'Registered the service');
  });
});
