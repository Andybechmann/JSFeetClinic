'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var TherapistSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Therapist', TherapistSchema);
