'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var TherapistCtrlStub = {
  index: 'TherapistCtrl.index',
  show: 'TherapistCtrl.show',
  create: 'TherapistCtrl.create',
  update: 'TherapistCtrl.update',
  destroy: 'TherapistCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var TherapistIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './Therapist.controller': TherapistCtrlStub
});

describe('Therapist API Router:', function() {

  it('should return an express router instance', function() {
    TherapistIndex.should.equal(routerStub);
  });

  describe('GET /api/therapist', function() {

    it('should route to Therapist.controller.index', function() {
      routerStub.get
        .withArgs('/', 'TherapistCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/therapist/:id', function() {

    it('should route to Therapist.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'TherapistCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/therapist', function() {

    it('should route to Therapist.controller.create', function() {
      routerStub.post
        .withArgs('/', 'TherapistCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/therapist/:id', function() {

    it('should route to Therapist.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'TherapistCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/therapist/:id', function() {

    it('should route to Therapist.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'TherapistCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/therapist/:id', function() {

    it('should route to Therapist.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'TherapistCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
