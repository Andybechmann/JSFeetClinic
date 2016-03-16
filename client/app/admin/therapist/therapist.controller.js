'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function ($scope,TherapistService) {

    TherapistService.query(function(therapists){
      $scope.therapists = therapists;
    });

    $scope.deleteTherapist = function(therapist){
      TherapistService.delete({id:therapist._id}, function(therapist){
        console.log('Therapist deleted');
      });
    };

    $scope.createTherapist = function(){
      TherapistService.save($scope.newTherapist, function(therapist){
       //show result
        // console.log(therapist);
      })
    };
  });
