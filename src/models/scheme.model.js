// scheme-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const scheme = new mongooseClient.Schema({
    name: { type: String, required: true },
  sectors : [{type: mongooseClient.Schema.Types.ObjectId , ref:'sector'}],
  level:{ type: String},
  department:{type: mongooseClient.Schema.Types.ObjectId , ref:'department'}, //e.g organization
  group:{type: mongooseClient.Schema.Types.ObjectId , ref:'group'}, // e.g Appointments
  antidotes:[{type: mongooseClient.Schema.Types.ObjectId , ref:'antidote'}],
  likelihood:{type: String},
  frequency: {type: String},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
  });

  return mongooseClient.model('scheme', scheme);
};
