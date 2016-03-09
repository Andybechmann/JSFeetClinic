'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BookingSchema = new mongoose.Schema({
  user:{
    type:Schema.ObjectId,
    ref:'User'
  },
  bookingDate:Date,
  treatmentDate:Date,
  therapist : {
    type:Schema.ObjectId,
    ref:'Therapist'
  },
  treatment:{
    type: Schema.ObjectId,
    ref: 'Treatment'
  }

});

export default mongoose.model('Booking', BookingSchema);
