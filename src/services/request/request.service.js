// Initializes the `request` service on path `/request`
const createService = require('feathers-mongoose');
const createModel = require('../../models/request.model');
const hooks = require('./request.hooks');
const filters = require('./request.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');
 
  

  const options = {
    name: 'request',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/request', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('request');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
