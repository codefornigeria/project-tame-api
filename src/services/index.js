const users = require('./users/users.service.js');
const rating = require('./rating/rating.service.js');
const antidote = require('./antidote/antidote.service.js');
const department = require('./department/department.service.js');
const entity = require('./entity/entity.service.js');
const group = require('./group/group.service.js');
const location = require('./location/location.service.js');
const scheme = require('./scheme/scheme.service.js');
const sector = require('./sector/sector.service.js');
const story = require('./story/story.service.js');

const email = require('./email/email.service.js');

module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(rating);
  app.configure(antidote);
  app.configure(department);
  app.configure(entity);
  app.configure(group);
  app.configure(location);
  app.configure(scheme);
  app.configure(sector);
  app.configure(story);
  app.configure(email);
};
