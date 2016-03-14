'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Therapist', {
        url: '/Therapist',
        templateUrl: 'app/Therapist/Therapist.html',
        controller: 'TherapistCtrl'
      });
  });
