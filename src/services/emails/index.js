'use strict';

const hooks = require('./hooks');
const Mailer = require('feathers-mailer');
const sparkPostTransport = require('nodemailer-sparkpost-transport');


module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  //var transporter = nodemailer.createTransport(sparkPostTransport(options))
  app.use('/emails', Mailer(sparkPostTransport({
    sparkPostApiKey:'61a105091ffcdf383f86ab90a393f0c4e1175c23'
  })));

  // Get our initialize service to that we can bind hooks
  const emailsService = app.service('/emails');

  // Set up our before hooks
  emailsService.before(hooks.before);

  // Set up our after hooks
  emailsService.after(hooks.after);
};
