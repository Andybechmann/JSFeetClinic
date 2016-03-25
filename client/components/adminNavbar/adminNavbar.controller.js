
angular.module('feetClinicApp')
  .controller('AdminNavbarController', function ($scope,$state, Auth) {

    $scope.menu = [
      {
      'title': 'Bookings',
      'state': 'adminBooking'
      },
      {
        'title': 'Behandler',
        'state': 'adminTherapists'
      },
      {
        'title': 'Behandling',
        'state': 'adminTreatment'
      },
    ];

    $scope.goToState = function(item){
      $state.go(item.state,{id:null});
    }

  });
