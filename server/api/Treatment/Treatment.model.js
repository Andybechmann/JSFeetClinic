'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TreatmentSchema = new mongoose.Schema({
  name: String,
  description:String,
  price: Number,
  duration:Number,
  type:String
  });

export default mongoose.model('Treatment', TreatmentSchema);
