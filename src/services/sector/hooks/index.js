'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


const sendVerifyEmail = options =>{
  console.log('hook options',options)
  return  hook =>{
    console.log('My email hook ran',hook.data )
    return Promise.resolve(hook)
  }
}
exports.before = {
  all: [sendVerifyEmail()],
  find: [],
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
