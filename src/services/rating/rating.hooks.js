
 const populate = require('feathers-populate-hook');
 const _ = require('lodash')

const processRating = options => {
    return hook =>{
      console.log('showing optios', hook.data)
      if(hook.data.ratingType =='public-assessor'){
           Promise.resolve(hook)
      }else{
    var finalScore =0;
    var scoreLength =0;
    var finalData = Object.assign({} ,hook.data)
    console.log('final data 1', finalData)
    finalData.schemes = []
    hook.data.schemes.map(function(scheme){
      //  delete scheme.$$hashKey
        finalData.schemes.push(scheme._id)

    })
    console.log('final data 2', finalData)
hook.data.ratingData.map(function(scheme){
    //  delete scheme.$$hashKey
          scheme.schemerater.map(function(rater){
            delete rater.$$hashKey
             finalScore =rater.score? finalScore+ scheme.score : finalScore
               scoreLength++
          })
       
      
      })

      console.log('final score', finalScore)
  
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
