// Initializes the `scheme` service on path `/scheme`
const createService = require('feathers-mongoose');
const createModel = require('../../models/scheme.model');
const hooks = require('./scheme.hooks');
const filters = require('./scheme.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'scheme',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/scheme', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('scheme');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
