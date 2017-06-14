// Initializes the `group` service on path `/group`
const createService = require('feathers-mongoose');
const createModel = require('../../models/group.model');
const hooks = require('./group.hooks');
const filters = require('./group.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'group',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/group', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('group');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
