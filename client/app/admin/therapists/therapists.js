'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('adminTherapists', {
        url: '/admin/therapists',
        templateUrl: 'app/admin/therapists/therapists.html',
        controller: 'AdminTherapistsCtrl'
      });
  });
