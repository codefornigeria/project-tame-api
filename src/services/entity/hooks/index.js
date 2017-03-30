'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');


const findByDomain = options => {
  console.log('showing optios', options)
  return hook =>{
    console.log('showing hooks' ,hook.params.query  )
    hook.params.query.domains = hook.params.query.domains.split('@')[1]
      console.log('showing hooks' ,hook.params.query  )
    Promise.resolve(hook)
  }
}

exports.before = {
  all: [],
  find: [findByDomain()],
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
