'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('treatment', {
        url: '/treatment',
        templateUrl: 'app/admin/treatment/treatment.html',
        controller: 'TreatmentCtrl'
      });
  });
