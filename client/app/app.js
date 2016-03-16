'use strict';

angular.module('feetClinicApp', [
    'feetClinicApp.auth',
    'feetClinicApp.admin',
    'feetClinicApp.constants',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'btford.socket-io',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'ngMaterial',
    'ngMessages',

  ])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);


  });

