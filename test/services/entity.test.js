const assert = require('assert');
const app = require('../../src/app');

describe('\'entity\' service', () => {
  it('registered the service', () => {
    const service = app.service('entity');

    assert.ok(service, 'Registered the service');
  });
});
