// Initializes the `antidote` service on path `/antidote`
const createService = require('feathers-mongoose');
const createModel = require('../../models/antidote.model');
const hooks = require('./antidote.hooks');
const filters = require('./antidote.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'antidote',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/antidote', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('antidote');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
