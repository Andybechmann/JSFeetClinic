'use strict';

describe('Controller: TherapistCtrl', function () {

  // load the controller's module
  beforeEach(module('feetClinicApp'));

  var TherapistCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TherapistCtrl = $controller('TherapistCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
