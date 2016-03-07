'use strict';

angular.module('feetClinicApp.auth', [
  'feetClinicApp.constants',
  'feetClinicApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
