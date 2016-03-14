'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Contact', {
        url: '/Contact',
        templateUrl: 'app/Contact/Contact.html',
        controller: 'ContactCtrl'
      });
  });
