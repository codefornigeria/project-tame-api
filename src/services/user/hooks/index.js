'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const auth = require('feathers-authentication').hooks;
const sendTemplateEmail =  require('../../../actions').sendTemplateEmail;
const issueToken =  require('../../../actions').issueToken;
const verifyHooks = require('feathers-authentication-management').hooks;
const common = require('feathers-hooks-common');
const sendVerifyEmail = options =>{
  console.log('hook options',options)
  return  hook =>{
    console.log('My email hook ran',hook.result)
    var registrationToken = issueToken(hook.result ,360)
    console.log('registration token ', registrationToken)

    return Promise.resolve(hook)
  }
}


exports.before = {
  all: [],
  find: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated()
  ],
  get: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ],
  create: [
    auth.hashPassword(),
    common.lowerCase('email'),
    verifyHooks.addVerification(),
  ],
  update: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ],
  patch: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ],
  remove: [
    auth.verifyToken(),
    auth.populateUser(),
    auth.restrictToAuthenticated(),
    auth.restrictToOwner({ ownerField: '_id' })
  ]
};

exports.after = {
  all: [hooks.remove('password')],
  find: [],
  get: [],
  create: [ globalHooks.sendVerificationEmail(),
  // removes verification/reset fields other than .isVerified
  verifyHooks.removeVerification(),
],
  update: [],
  patch: [],
  remove: []
};
