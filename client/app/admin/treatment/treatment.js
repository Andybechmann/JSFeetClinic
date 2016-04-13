'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('adminTreatment', {
        url: '/admin/treatment/:id',
        templateUrl: 'app/admin/treatment/treatment.html',
        controller: 'AdminTreatmentCtrl',
        authenticate: 'admin'
      });
  });
