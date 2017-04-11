'use strict';

// rating-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  entity:{type: Schema.Types.ObjectId , ref:'entity'},
  schemes:[{type: Schema.Types.ObjectId , ref:'schemes'}],
  score:{type : Number , default :0},
  ratingData:{},
  ratingType:{type:String , default:'self-assessor'},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});

const ratingModel = mongoose.model('rating', ratingSchema);

module.exports = ratingModel;
