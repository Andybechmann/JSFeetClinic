'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('Products', {
        url: '/Products',
        templateUrl: 'app/Products/Products.html',
        controller: 'ProductsCtrl'
      });
  });
