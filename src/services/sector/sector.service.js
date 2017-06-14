// Initializes the `sector` service on path `/sector`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sector.model');
const hooks = require('./sector.hooks');
const filters = require('./sector.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'sector',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/sector', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('sector');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
