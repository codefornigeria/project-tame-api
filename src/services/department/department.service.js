// Initializes the `department` service on path `/department`
const createService = require('feathers-mongoose');
const createModel = require('../../models/department.model');
const hooks = require('./department.hooks');
const filters = require('./department.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'department',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/department', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('department');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
