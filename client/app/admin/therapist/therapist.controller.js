'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function ($scope,TherapistService) {

    TherapistService.query(function(therapists){
      $scope.therapists = therapists;
    });

    $scope.createTherapist = function(){
      TherapistService.save($scope.newTherapist, function(therapist){
       //show result
        // console.log(therapist);
      })
    }
  });
