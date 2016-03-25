'use strict';

describe('Controller: AdminTherapistsCtrl', function () {

  // load the controller's module
  beforeEach(module('feetClinicApp'));

  var AdminTherapistsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminTherapistsCtrl = $controller('AdminTherapistsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
