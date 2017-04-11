'use strict';

// entity-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entitySchema = new Schema({
  name: { type: String, required: true },
  size: { type: String },
  address: { type: String },
  city:{type:String},
  state: { type: String, required: true },
  zone:{type:String},
  domains:[{type: String}],
  isSelfRated:{ type: Boolean , 'default':false },
  indieRated:{ type: Boolean, 'default':false},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }

});

const entityModel = mongoose.model('entity', entitySchema);

module.exports = entityModel;
