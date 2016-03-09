'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var TreatmentCtrlStub = {
  index: 'TreatmentCtrl.index',
  show: 'TreatmentCtrl.show',
  create: 'TreatmentCtrl.create',
  update: 'TreatmentCtrl.update',
  destroy: 'TreatmentCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var TreatmentIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './Treatment.controller': TreatmentCtrlStub
});

describe('Treatment API Router:', function() {

  it('should return an express router instance', function() {
    TreatmentIndex.should.equal(routerStub);
  });

  describe('GET /api/treatments', function() {

    it('should route to Treatment.controller.index', function() {
      routerStub.get
        .withArgs('/', 'TreatmentCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/treatments/:id', function() {

    it('should route to Treatment.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'TreatmentCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/treatments', function() {

    it('should route to Treatment.controller.create', function() {
      routerStub.post
        .withArgs('/', 'TreatmentCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/treatments/:id', function() {

    it('should route to Treatment.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'TreatmentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/treatments/:id', function() {

    it('should route to Treatment.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'TreatmentCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/treatments/:id', function() {

    it('should route to Treatment.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'TreatmentCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
