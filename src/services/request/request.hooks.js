const { authenticate } = require('feathers-authentication').hooks;
const requestEmail = require('../../hooks/send-request-email');
 const populate = require('feathers-populate-hook');
const accountService = require('../authManagement/authManagement.notifier')
 const acceptRequest = options => hook => {
   const query= hook.params.query
   const data =hook.result
   switch(query.action){
     case 'accept':
    //  var updatedData = Object.assign({},data,{approved:true})
      // console.log('updated', updatedData)
      // delete updatedData.updatedAt;
      // delete updatedData.createdAt
     return hook.app.service('request').patch(data._id,{approved:true})
      .then(result => {
        hook.result = result
        return hook
      })
     break;
     case 'reject':
     var updatedData = Object.assign({},data,{approved:false})
      // console.log('updated', updatedData)
      // delete updatedData.updatedAt;
      // delete updatedData.createdAt
       return hook.app.service('request').patch(data._id,{approved:false})
      .then(result => {
        console.log('patch result', result)
        hook.result = result
        return hook
      })
     break
   }
  return hook
}

const updateEntity = options => hook => {
    const query= hook.params.query
   const data =hook.result
  console.log('update query',query)
  console.log('update entity data', data)
   switch(query.action){
     case 'accept':
     if(data.approved && data.assessorType =='self'){
      var entities = data.selfEntities? _.concat(data.selfEntities,[data.entity[0]._id]): [data.entity[0]._id]
       console.log('entities', entities)
      return hook.app.service('users').patch(data.user[0]._id, {selfEntities : entities})
       .then(result => {
         return hook
       })
     }
     if(data.approved && data.assessorType =='independent'){
      var entities = data.independentEntities? _.concat(data.independentEntities,[data.entity[0]._id]): [data.entity[0]._id]
       console.log('entities', entities)
      return hook.app.service('users').patch(data.user[0]._id, {independentEntities : entities})
       .then(result => {
         return hook
       })
     }
     break;
   }

  return hook

}

const notifyParties  = options => hook => {
 const request = hook.result
  if( hook.data  && request) { 
    accountService(hook.app)('sendRequestConfirmMail', request)
    return hook
  }
  return hook
}
module.exports = {
  before: {
    all: [],// authenticate('jwt') 
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [acceptRequest(),
          populate({
     
        entity:{
        service:'entity',
        f_key: '_id',
      },
      user:{
        service:'users',
        f_key: '_id',
        
      }
    }),
    updateEntity(),notifyParties()],
    create: [populate({
     
      entity:{
        service:'entity',
        f_key: '_id',
      },
      user:{
        service:'users',
        f_key: '_id',
        
      }
    }),requestEmail()],
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
