'use strict';

var app = require('../..');
import request from 'supertest';

var newTherapist;

describe('Therapist API:', function() {

  describe('GET /api/therapist', function() {
    var Therapists;

    beforeEach(function(done) {
      request(app)
        .get('/api/therapist')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Therapists = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      Therapists.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/therapist', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/therapist')
        .send({
          name: 'New Therapist',
          info: 'This is the brand new Therapist!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newTherapist = res.body;
          done();
        });
    });

    it('should respond with the newly created Therapist', function() {
      newTherapist.name.should.equal('New Therapist');
      newTherapist.info.should.equal('This is the brand new Therapist!!!');
    });

  });

  describe('GET /api/therapist/:id', function() {
    var Therapist;

    beforeEach(function(done) {
      request(app)
        .get('/api/therapist/' + newTherapist._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          Therapist = res.body;
          done();
        });
    });

    afterEach(function() {
      Therapist = {};
    });

    it('should respond with the requested Therapist', function() {
      Therapist.name.should.equal('New Therapist');
      Therapist.info.should.equal('This is the brand new Therapist!!!');
    });

  });

  describe('PUT /api/therapist/:id', function() {
    var updatedTherapist;

    beforeEach(function(done) {
      request(app)
        .put('/api/therapist/' + newTherapist._id)
        .send({
          name: 'Updated Therapist',
          info: 'This is the updated Therapist!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTherapist = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTherapist = {};
    });

    it('should respond with the updated Therapist', function() {
      updatedTherapist.name.should.equal('Updated Therapist');
      updatedTherapist.info.should.equal('This is the updated Therapist!!!');
    });

  });

  describe('DELETE /api/therapist/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/therapist/' + newTherapist._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when Therapist does not exist', function(done) {
      request(app)
        .delete('/api/therapist/' + newTherapist._id)
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
