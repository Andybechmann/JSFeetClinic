'use strict';

angular.module('feetClinicApp')
  .controller('TherapistCtrl', function ($scope,TherapistService,socket,Auth,$stateParams,$state) {
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.id = $stateParams.id;

    $scope.isId = function () {
      return !(_.isEmpty($scope.id) );
    };

    TherapistService.query(function(therapists){
      $scope.therapists = therapists;
      socket.syncUpdates('Therapist',$scope.therapists);
    });
    $scope.$on('$destroy',function(){
    socket.unsyncUpdates('Therapist');
    });

    if ($scope.isId()) {
      TherapistService.get({id: $scope.id}, function (therapist) {
        $scope.therapist = therapist;

      });
    }
    $scope.goToDetail = function (therapist) {
      console.log('peter pan' + therapist._id );
      $state.go('Therapist', {id: therapist._id});
    };

    $scope.goToTreatment = function (treatment) {
      $state.go('Treatment', {id: treatment._id});
    };

    $scope.goBack = function(){
      window.history.back();
    };


  });
