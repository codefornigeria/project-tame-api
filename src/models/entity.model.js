// entity-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const entity = new mongooseClient.Schema({
 name: { type: String, required: true },
  size: { type: String },
  address: { type: String },
  city:{type:String},
  state: { type: String, required: true },
  zone:{type:String},
  domains:[{type: String}],
  sectors : [{type: mongooseClient.Schema.Types.ObjectId , ref:'sector'}],
  isSelfRated:{ type: Boolean , 'default':false },
  indieRated:{ type: Boolean, 'default':false},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
  });

  return mongooseClient.model('entity', entity);
};
