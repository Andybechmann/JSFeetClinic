'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose')),
Schema = mongoose.Schema;


var TherapistSchema = new mongoose.Schema({
  name:{
    type:String,
    unique: true
  },
  description:String,
  imageUrl: String,
  treatments:[{
    type: Schema.ObjectId,
    ref:'Treatment'}],
  bookings: [{
    type: Schema.ObjectId,
    ref:'Booking'
  }],
  dayWorking:[{
    dayOfWeek:String,
    active:Boolean,
    openingHours:{startTime:Date,endTime:Date},
    pauses:[{startTime:Date,endTime:Date}]
  }],
   holiday:[{
     startDate:Date,
     endDate: Date
    }]
});

export default mongoose.model('Therapist', TherapistSchema);
