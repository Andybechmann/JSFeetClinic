'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var BookingSchema = new mongoose.Schema({
  name: String,
  user:{
    type:Schema.ObjectId,
    ref:'User'
  },
  bookingDate:Date,
  

});

export default mongoose.model('Booking', BookingSchema);
