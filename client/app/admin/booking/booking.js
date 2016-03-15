'use strict';

angular.module('feetClinicApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('adminBooking', {
        url: '/admin/booking',
        templateUrl: 'app/admin/booking/booking.html',
        controller: 'AdminBookingCtrl',
        authenticate: 'admin'
      });
  });
