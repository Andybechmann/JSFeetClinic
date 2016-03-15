
angular.module('feetClinicApp')
  .controller('AdminNavbarController', function ($scope, Auth) {

    $scope.menu = [
      {
      'title': 'Bookings',
      'state': 'adminBooking'
      },
      {
        'title': 'Behandler',
        'state': 'adminTherapist'
      },
      {
        'title': 'Behandling',
        'state': 'adminTreatment'
      },
    ];

  });
