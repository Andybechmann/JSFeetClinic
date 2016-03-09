'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TherapistSchema = new mongoose.Schema({
  name: String,
  description:String,
  treaments:[{
    type: Schema.ObjectId,
    ref:'Treatment'
  }]
}
);

export default mongoose.model('Therapist', TherapistSchema);
