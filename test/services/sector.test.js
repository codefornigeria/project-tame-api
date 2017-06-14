const assert = require('assert');
const app = require('../../src/app');

describe('\'sector\' service', () => {
  it('registered the service', () => {
    const service = app.service('sector');

    assert.ok(service, 'Registered the service');
  });
});
