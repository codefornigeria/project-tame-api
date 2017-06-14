const assert = require('assert');
const app = require('../../src/app');

describe('\'rating\' service', () => {
  it('registered the service', () => {
    const service = app.service('rating');

    assert.ok(service, 'Registered the service');
  });
});
