'use strict';

const service = require('feathers-mongoose');
const entity = require('./entity-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: entity,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/entities', service(options));

  // Get our initialize service to that we can bind hooks
  const entityService = app.service('/entities');

  // Set up our before hooks
  entityService.before(hooks.before);

  // Set up our after hooks
  entityService.after(hooks.after);
};
