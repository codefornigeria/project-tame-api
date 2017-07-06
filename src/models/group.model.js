// group-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const group = new mongooseClient.Schema({
    name: { type: String, required: true },
    effects: [{ type: mongooseClient.Schema.Types.ObjectId, ref: 'effect' }],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });

  return mongooseClient.model('group', group);
};
