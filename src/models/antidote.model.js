// antidote-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const antidote = new mongooseClient.Schema({
    name: { type: String, required: true },
    description: { type: 'String' },
    score: { type: Number, required: true },
    location: { type: mongooseClient.Schema.Types.ObjectId, ref: 'location' },
    createdAt: { type: Date, 'default': Date.now },
    updatedAt: { type: Date, 'default': Date.now }
  });

  return mongooseClient.model('antidote', antidote);
};
