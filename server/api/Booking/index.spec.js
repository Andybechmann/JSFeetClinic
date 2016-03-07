'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var BookingCtrlStub = {
  index: 'BookingCtrl.index',
  show: 'BookingCtrl.show',
  create: 'BookingCtrl.create',
  update: 'BookingCtrl.update',
  destroy: 'BookingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var BookingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './Booking.controller': BookingCtrlStub
});

describe('Booking API Router:', function() {

  it('should return an express router instance', function() {
    BookingIndex.should.equal(routerStub);
  });

  describe('GET /api/bookings', function() {

    it('should route to Booking.controller.index', function() {
      routerStub.get
        .withArgs('/', 'BookingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/bookings/:id', function() {

    it('should route to Booking.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'BookingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bookings', function() {

    it('should route to Booking.controller.create', function() {
      routerStub.post
        .withArgs('/', 'BookingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/bookings/:id', function() {

    it('should route to Booking.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'BookingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bookings/:id', function() {

    it('should route to Booking.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'BookingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bookings/:id', function() {

    it('should route to Booking.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'BookingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
