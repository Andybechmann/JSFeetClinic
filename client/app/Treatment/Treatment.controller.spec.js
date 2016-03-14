'use strict';

describe('Controller: TreatmentCtrl', function () {

  // load the controller's module
  beforeEach(module('feetClinicApp'));

  var TreatmentCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TreatmentCtrl = $controller('TreatmentCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
