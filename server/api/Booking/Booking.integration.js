'use strict';

var app = require('../..');
import request from 'supertest';

var newBooking;

describe('Booking API:', function() {

  describe('GET /api/bookings', function() {
    var Bookings;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Bookings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Bookings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bookings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bookings')
        .send({
          name: 'New Booking',
          info: 'This is the brand new Booking!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newBooking = res.body;
          done();
        });
    });

    it('should respond with the newly created Booking', function() {
      newBooking.name.should.equal('New Booking');
      newBooking.info.should.equal('This is the brand new Booking!!!');
    });

  });

  describe('GET /api/bookings/:id', function() {
    var Booking;

    beforeEach(function(done) {
      request(app)
        .get('/api/bookings/' + newBooking._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Booking = res.body;
          done();
        });
    });

    afterEach(function() {
      Booking = {};
    });

    it('should respond with the requested Booking', function() {
      Booking.name.should.equal('New Booking');
      Booking.info.should.equal('This is the brand new Booking!!!');
    });

  });

  describe('PUT /api/bookings/:id', function() {
    var updatedBooking;

    beforeEach(function(done) {
      request(app)
        .put('/api/bookings/' + newBooking._id)
        .send({
          name: 'Updated Booking',
          info: 'This is the updated Booking!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBooking = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBooking = {};
    });

    it('should respond with the updated Booking', function() {
      updatedBooking.name.should.equal('Updated Booking');
      updatedBooking.info.should.equal('This is the updated Booking!!!');
    });

  });

  describe('DELETE /api/bookings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bookings/' + newBooking._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Booking does not exist', function(done) {
      request(app)
        .delete('/api/bookings/' + newBooking._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
