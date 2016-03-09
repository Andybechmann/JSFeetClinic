'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'))
,
Schema = mongoose.Schema;

var TreatmentSchema = new mongoose.Schema({
  name: String,
  description:String,
  price: Number,
  duration:Number,
  type:String
  });

export default mongoose.model('Treatment', TreatmentSchema);
