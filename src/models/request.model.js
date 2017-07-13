// request-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const request = new mongooseClient.Schema({
    approved: { type: Boolean, default: false },
    entity: { type: mongooseClient.Schema.Types.ObjectId, ref: 'entity' },
    assessorType: { type: String, required: true },
    user: { type: mongooseClient.Schema.Types.ObjectId, ref: 'users' },
    comment: {type: String},
    active: {type:Boolean: default:false},
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('request', request);
};
