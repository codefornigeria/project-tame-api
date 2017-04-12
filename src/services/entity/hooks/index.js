'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const mongoose = require('mongoose')

const findByDomain = options => {
  console.log('showing optio', options)
  return hook =>{

    // console.log('showing hooks' ,hook.params.query  )
    // hook.params.query.domains = hook.params.query.domains.split('@')[1]
    //   console.log('showing hooks' ,hook.params.query  )
    Promise.resolve(hook)
  }
}
const  transformIds  = options =>{
  return hook =>{
    if(Array.isArray(hook.params.query._ids)){
      hook.params.query._ids.map(function (id){
        return mongoose.Types.ObjectId(id)
      })
    }
  console.log('shoiwng changed hook ', hook.params.query )
    Promise.resolve(hook)
  }
}

exports.before = {
  all: [],
  find: [transformIds(),findByDomain()],
  get: [],
  create: [],
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
