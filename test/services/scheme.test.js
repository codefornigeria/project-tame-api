const assert = require('assert');
const app = require('../../src/app');

describe('\'scheme\' service', () => {
  it('registered the service', () => {
    const service = app.service('scheme');

    assert.ok(service, 'Registered the service');
  });
});
