'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function ($scope,TherapistService) {

    $scope.topDirections = ['left', 'up'];
    $scope.bottomDirections = ['down', 'right'];
    $scope.isOpen = false;
    $scope.availableModes = ['md-fling', 'md-scale'];
    $scope.selectedMode = 'md-fling';
    $scope.availableDirections = ['up', 'down', 'left', 'right'];
    $scope.selectedDirection = 'up';

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

