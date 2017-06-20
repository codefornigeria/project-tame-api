
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
      entity:{
        service:'entity',
        f_key: '_id',
        
      },
      schemes:{
        service:'scheme',
        f_key: '_id',
        
      },
         sectors:{
        service:'sector',
        f_key: '_id',
        
      },
      
    })],
    get: [populate({
      entity:{
        service:'entity',
        f_key: '_id',
        
      },
      schemes:{
        service:'scheme',
        f_key: '_id',
        
      },
         sectors:{
        service:'sector',
        f_key: '_id',
        
      },
      
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
