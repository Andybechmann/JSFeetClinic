'use strict';

angular.module('feetClinicApp')
  .controller('TreatmentCtrl', function ($scope, TreatmentService,socket,$stateParams, $state) {

    $scope.id = $stateParams.id;

    $scope.isId = function () {
      return !(_.isEmpty($scope.id) );
    };

    TreatmentService.query(function (treatments) {
      $scope.treatments = treatments;
      socket.syncUpdates('Treatment',$scope.treatments);
    });

     $scope.$on('$destroy',function(){
     socket.unsyncUpdates('Treatment');
     });

    if ($scope.isId()) {
      TreatmentService.get({id: $scope.id}, function (treatment) {
        $scope.treatment = treatment;
      });
    }
    $scope.goToDetail = function (treatment) {
      $state.go('Treatment', {id: treatment._id});
    };

    $scope.goBack = function(){
      window.history.back();
    };

  });
