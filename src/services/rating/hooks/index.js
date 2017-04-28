'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
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

        finalScore = finalScore+ antidote.score
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
const processRatingEntity = options =>{
   return hook =>{
      // this function process a rating based on rating type and update the entity involved in the rating process
       let entityService = hook.app.service('entities')
        var patchData ={}
        if(hook.params.user.userType == 'self-assessor'){
          patchData.isSelfRated =true
        }

        if(hook.params.user.userType == 'independent-assessor'){
          patchData.indieRated =true
        }
        console.log('result' , hook.result)
        entityService.patch(hook.result.entity , patchData).then(function(entity){
          Promise.resolve(hook)
        }).catch(function(err){
          Promise.resolve(hook)
        })
   }
}
const mongoose = require('mongoose')
const  transformIds  = options =>{
  return hook =>{
    if(Array.isArray(hook.params.query._id)){
     var _id  =   hook.params.query._id.map(function (id){
        return mongoose.Types.ObjectId(id)
      })
      console.log('showing id',_id)
      hook.params.query._id = _id
  console.log('shoiwng   hook ', hook.params.query )
        Promise.resolve(hook)
    }else{
      console.log('showing, hook ', hook.params.query )
        Promise.resolve(hook)
    }

  }
}
exports.before = {
  all: [],
  find: [],
  get: [],
  create: [auth.verifyToken(),
  auth.populateUser(),
  auth.restrictToAuthenticated(),processRating()],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [processRatingEntity()],
  update: [],
  patch: [],
  remove: []
};
