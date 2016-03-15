'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
Schema = mongoose.Schema;


var TherapistSchema = new mongoose.Schema({
  name:{
    type:String,
    unique: true
  },
  description:String,
  treatments:[String],
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
