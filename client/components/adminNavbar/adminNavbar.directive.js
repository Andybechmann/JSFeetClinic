'use strict';

angular.module('feetClinicApp')
  .directive('adminNavbar', () => ({
    templateUrl: 'components/adminNavbar/adminNavbar.html',
    restrict: 'E',
    controller: 'AdminNavbarController'
  }));

