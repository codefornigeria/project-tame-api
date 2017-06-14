// Initializes the `rating` service on path `/rating`
const createService = require('feathers-mongoose');
const createModel = require('../../models/rating.model');
const hooks = require('./rating.hooks');
const filters = require('./rating.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'rating',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/rating', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('rating');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
