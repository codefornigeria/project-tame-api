// Initializes the `email` service on path `/email`

const Mailer = require('feathers-mailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');
const createService = require('./email.class.js');
const hooks = require('./email.hooks');
const filters = require('./email.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'email',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/email', Mailer(sparkPostTransport({
    sparkPostApiKey:'61a105091ffcdf383f86ab90a393f0c4e1175c23'
  })));
  // Get our initialized service so that we can register hooks and filters
  const service = app.service('email');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};
