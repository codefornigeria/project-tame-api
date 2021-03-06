
 const populate = require('feathers-populate-hook');

 
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [populate({
      effects:{
        service:'effect',
        f_key: '_id',
        
      }
    })],
    get: [populate({
      effects:{
        service:'effect',
        f_key: '_id',
        
      }
    })],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
