'use strict';

describe('Controller: AdminTherapistCtrl', function () {

  // load the controller's module
  beforeEach(module('feetClinicApp'));

  var AdminTherapistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    AdminTherapistCtrl = $controller('AdminTherapistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
