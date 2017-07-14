

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
      sectors:{
        service:'sector',
        f_key: '_id',
        
      },
      group:{
        service:'group',
        f_key: '_id',
         query:  {  // defaults to {} but you can specify any other options here
            $select: ['name','effects']
          }
      },
        department:{
        service:'department',
        f_key: '_id',
        query:  {  // defaults to {} but you can specify any other options here
            $select: ['name']
          }
      },
      antidotes:{
        service:'antidote',
        f_key: '_id',
        
      }
    })],
    get: [populate({
      sectors:{
        service:'sector',
        f_key: '_id',
         query:  {  // defaults to {} but you can specify any other options here
            $select: ['name']
          }
      },
      group:{
        service:'group',
        f_key: '_id',
         query:  {  // defaults to {} but you can specify any other options here
            $select: ['name','effects']
          }
      },
        department:{
        service:'department',
        f_key: '_id',
        query:  {  // defaults to {} but you can specify any other options here
            $select: ['name']
          }
      }
      ,
      antidotes:{
        service:'antidote',
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
