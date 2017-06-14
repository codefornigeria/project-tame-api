// Initializes the `story` service on path `/story`
const createService = require('feathers-mongoose');
const createModel = require('../../models/story.model');
const hooks = require('./story.hooks');
const filters = require('./story.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'story',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/story', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('story');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
