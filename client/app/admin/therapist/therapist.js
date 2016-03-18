'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('adminTherapist', {
        url: '/admin/therapist/:id',
        templateUrl: 'app/admin/therapist/therapist.html',
        controller: 'AdminTherapistCtrl',
        authenticate: 'admin'
      });
  });
