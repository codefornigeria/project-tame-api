
 const populate = require('feathers-populate-hook');
 const _ = require('lodash')

const processRating = options => {
    return hook =>{
      console.log('showing optios', hook.data)

    var finalScore =0;
    var scoreLength =0;
    var finalData = Object.assign({} ,hook.data)
    finalData.schemes = []
    hook.data.schemes.map(function(scheme){
      //  delete scheme.$$hashKey
        finalData.schemes.push(scheme._id)

    })

  hook.data.ratingData.map(function(scheme){
    //  delete scheme.$$hashKey

        finalScore = finalScore+ scheme.score
        scoreLength++
      })
  try{
  finalData.score = finalScore/scoreLength
}catch(e){
  finalData.score=0.00
}
  finalData.entity = hook.data.organizationId,

  hook.data = finalData
 console.log('final data' , hook.data)
    Promise.resolve(hook)
  }
}

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [processRating()],
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
