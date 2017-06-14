// ratings-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const ratings = new mongooseClient.Schema({
   entity:{type: mongooseClient.Schema.Types.ObjectId , ref:'entity'},
  schemes:[{type: mongooseClient.Schema.Types.ObjectId , ref:'schemes'}],
  score:{type : Number , default :0},
  ratingData:{},
  ratingType:{type:String , default:'self-assessor'},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
  });

  return mongooseClient.model('ratings', ratings);
};
