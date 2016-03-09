'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
Schema = mongoose.Schema;


var TherapistSchema = new mongoose.Schema({
  name: String,
  description:String,
  treaments:[{
    type: Schema.ObjectId,
    ref:'Treatment'
  }],
  bookings: [{
    type: Schema.ObjectId,
    ref:'Booking'
  }],

    dayWorking:[{
      dayOfWeek: Number,
      startTime:Date,
      endTime: Date,
      StartLunch: Date,
      lunchDuration:Number
    }],
    holiday:[{
      startDate:Date,
      endDate: Date
    }]
  
});

export default mongoose.model('Therapist', TherapistSchema);
