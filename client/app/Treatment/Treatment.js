'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Treatment', {
        url: '/Treatment',
        templateUrl: 'app/Treatment/Treatment.html',
        controller: 'TreatmentCtrl'
      });
  });
