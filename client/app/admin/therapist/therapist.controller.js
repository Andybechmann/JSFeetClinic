'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function ($scope,TherapistService) {

    $scope.createTherapist = function(){
      TherapistService.save($scope.newTherapist, function(therapist){
       //show resulr
        // console.log(therapist);
      })
    }
  });
