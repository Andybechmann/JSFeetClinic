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
    };

    $scope.deleteTherapist = function(therapist){
      TherapistService.delete({id:therapist._id}, function(therapist){
        console.log('Therapist deleted');
      });
    };

    $scope.updateTherapist = function(therapist) {
      //console.log('i clicked');
      TherapistService.update({  id: therapist._id}, therapist,
        function(therapist) {
        console.log('update treatment', therapist);
      });
    };
    });

