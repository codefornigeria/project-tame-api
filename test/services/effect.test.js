const assert = require('assert');
const app = require('../../src/app');

describe('\'effect\' service', () => {
  it('registered the service', () => {
    const service = app.service('effect');

    assert.ok(service, 'Registered the service');
  });
});
