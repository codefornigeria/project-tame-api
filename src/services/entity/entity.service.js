// Initializes the `entity` service on path `/entity`
const createService = require('feathers-mongoose');
const createModel = require('../../models/entity.model');
const hooks = require('./entity.hooks');
const filters = require('./entity.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'entity',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/entity', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('entity');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
