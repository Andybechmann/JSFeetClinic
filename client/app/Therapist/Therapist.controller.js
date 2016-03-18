'use strict';

angular.module('feetClinicApp')
  .controller('TherapistCtrl', function ($scope,TherapistService,socket,Auth) {
    $scope.isLoggedIn = Auth.isLoggedIn;
    
    TherapistService.query(function(therapists){
      $scope.therapists = therapists;
      socket.syncUpdates('Therapist',$scope.therapists);
    });
  });
