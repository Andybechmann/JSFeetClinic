'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Treatment', {
        url: '/Treatment/:id',
        templateUrl: 'app/Treatment/Treatment.html',
        controller: 'TreatmentCtrl'
      });
  });
