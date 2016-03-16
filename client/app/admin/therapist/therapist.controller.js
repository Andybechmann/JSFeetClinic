'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function ($scope,TherapistService) {

    TherapistService.query(function(therapists){
      $scope.therapists = therapists;
    });


    $scope.updateTherapist = function(update) {
      console.log('i clicked');
      TherapistService.update({
        id: update._id
      }, update, function(update) {
        console.log('update treatment', update);
      });

    };



    $scope.deleteTherapist = function(things) {
      TherapistService.delete({
        id: things._id
      }, function(things) {
        console.log('delete therapist', things);
      });
    };
    });


  /*  $scope.createTherapist = function(){
      TherapistService.save($scope.newTherapist, function(therapist){
       //show result
        // console.log(therapist);
      })
    }
  });
  */
