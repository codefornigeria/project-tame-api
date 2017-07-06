// Initializes the `effect` service on path `/effect`
const createService = require('feathers-mongoose');
const createModel = require('../../models/effect.model');
const hooks = require('./effect.hooks');
const filters = require('./effect.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'effect',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/effect', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('effect');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
