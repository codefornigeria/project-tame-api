
const populate = require('feathers-populate-hook');
const _ = require('lodash')

const processRating = options => {
  return hook => {
    console.log('showing optios', hook.data)
    if (hook.data.ratingType == 'public-assessor') {
      hook.data.score= hook.data.score/5

      Promise.resolve(hook)
    } else {
      var finalScore = 0;
      var scoreLength = 0;
      var totalScore = 0;
      var finalData = Object.assign({}, hook.data)
      console.log('final data 1', finalData)
      finalData.schemes = []
      hook.data.schemes.map(function (scheme) {
        finalData.schemes.push(scheme._id)
        scheme.antidotes.map(function(antidote)  {
          totalScore = totalScore +antidote.score
        })

      })
      console.log('final data 2', finalData)

      hook.data.ratingData.map(function (scheme) {
        console.log('the scheme', scheme)
        scheme.schemerater.map(function (rater) {
          console.log('the rater', rater)
          delete rater.$$hashKey
          finalScore = rater.score ? finalScore + rater.score : finalScore
          scoreLength++
        })


      })
      console.log('the total score', totalScore)
      console.log('final score', finalScore)

      try {
        finalData.score = finalScore / totalScore
      } catch (e) {
        finalData.score = 0.00
      }
      finalData.entity = hook.data.organizationId,

        hook.data = finalData
      console.log('final data', hook.data)
      Promise.resolve(hook)
    }


  }
}

const updateEntity = options => {
  return hook => {
    console.log('showing optios', hook.data)
     console.log('showing result', hook.result)
    if (hook.data.ratingType == 'public-assessor') {
      Promise.resolve(hook)
    } else if (hook.data.ratingType == 'self-assessor') {
       return hook.app.service('enntity').patch(hook.result.entity,{
          selfRated:true
        }).then(result => {
          return hook
        }

        ).catch(err => {
          return hook
      })

     
    }else if (hook.data.ratingType == 'independent-assessor') {
       return hook.app.service('enntity').patch(hook.result.entity,{
          indieRated:true
        }).then(result => {
          return hook
        }

        ).catch(err => {
          return hook
      })

     
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
      entity: {
        service: 'entity',
        f_key: '_id',

      },
      schemes: {
        service: 'scheme',
        f_key: '_id',

      },
       group: {
        service: 'group',
        f_key: '_id',

      },
      sectors: {
        service: 'sector',
        f_key: '_id',

      },

    })],
    get: [populate({
      entity: {
        service: 'entity',
        f_key: '_id',

      },
      schemes: {
        service: 'scheme',
        f_key: '_id',

      },
      sectors: {
        service: 'sector',
        f_key: '_id',

      },

    })],
    create: [updateEntity()],
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
