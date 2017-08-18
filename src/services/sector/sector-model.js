'use strict';

// sector-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sectorSchema = new Schema({
  name: { type: String, required: true },
  active: {type:Boolean , 'default':false},
  createdAt: { type: Date, 'default': Date.now },
  updatedAt: { type: Date, 'default': Date.now }
});
sectorSchema.index({name: 'text'})

const sectorModel = mongoose.model('sector', sectorSchema);

module.exports = sectorModel;
