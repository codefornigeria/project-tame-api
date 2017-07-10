const assert = require('assert');
const app = require('../../src/app');

describe('\'request\' service', () => {
  it('registered the service', () => {
    const service = app.service('request');

    assert.ok(service, 'Registered the service');
  });
});
