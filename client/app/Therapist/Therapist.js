'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider, $mdIconProvider ) {
    $stateProvider
      .state('Therapist', {
        url: '/Therapist',
        templateUrl: 'app/Therapist/Therapist.html',
        controller: 'TherapistCtrl'
      });

    $mdIconProvider
      .iconSet('social', 'img/icons/sets/social-icons.svg', 24)
      .iconSet('device', 'img/icons/sets/device-icons.svg', 24)
      .iconSet('communication', 'img/icons/sets/communication-icons.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);


  });
