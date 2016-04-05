'use strict';

angular.module('feetClinicApp')
  .controller('NavbarController', function ($scope,Auth,$state) {
    $scope.menu = [{
      'title': 'Home',
      'state': 'main'
    },
    {
      'title': 'Treatment',
      'state': 'Treatment'
    },
    {
      'title': 'Therapist',
      'state': 'Therapist'
    },
    {
      'title': 'Products',
      'state': 'Products'
    }
//regeg
  ];

    $scope.goTo = function(item)
    {
      $state.go(item.state,{id:null});
    };
    $scope.isCollapsed = true;

    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;
  });
