'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const _ = require('lodash')
const processRating = options => {
  console.log('showing optios', options)
  return hook =>{
    var finalData = {schemes:[]}
    var finalScore =0;
    var scoreLength =0;
    finalData.ratingData = Object.assign({} ,hook.data)
    hook.data.schemes.map(function(scheme){
        delete scheme.$$hashKey
        finalData.schemes.push(scheme._id)
        scheme.antidotes.map(function(antidote){
        delete antidote.$$hashKey
          finalScore = finalScore+ antidote.score
          scoreLength++
        })
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
      console.log('shoiwng   hook ', hook.params.query )
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
  create: [],
  update: [],
  patch: [],
  remove: []
};
