'use strict';
const authManagement = require('./authManagement');
const emails = require('./emails');
const messages = require('./messages');
const entity = require('./entity');
const group = require('./group');
const department = require('./department');
const sector = require('./sector');
const location = require('./location');
const stories = require('./stories');
const antidotes = require('./antidotes');
const schemes = require('./schemes');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(schemes);
  app.configure(antidotes);
  app.configure(stories);
  app.configure(location);
  app.configure(sector);
  app.configure(department);
  app.configure(group);
  app.configure(entity);
  app.configure(messages);
  app.configure(emails);
  app.configure(authManagement);
  app.configure(authManagement);
};
