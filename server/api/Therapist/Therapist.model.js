'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TherapistSchema = new mongoose.Schema({
  name: String,
  description:String
});

export default mongoose.model('Therapist', TherapistSchema);
