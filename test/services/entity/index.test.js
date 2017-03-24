'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('entity service', function() {
  it('registered the entities service', () => {
    assert.ok(app.service('entities'));
  });
});
