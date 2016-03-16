'use strict';

angular.module('feetClinicApp')
  .controller('AdminTherapistCtrl', function($scope, TherapistService,socket) {



    $scope.topDirections = ['left', 'up'];
    $scope.bottomDirections = ['down', 'right'];
    $scope.isOpen = false;
    $scope.availableModes = ['md-fling', 'md-scale'];
    $scope.selectedMode = 'md-fling';
    $scope.availableDirections = ['up', 'down', 'left', 'right'];
    $scope.selectedDirection = 'up';

    TherapistService.query(function(therapists) {
      $scope.therapists = therapists;
    });

    socket.syncUpdates('Therapist',$scope.therapists,
    function(event){
      console.log('updatet',event);
    });

    $scope.$on('$destroy',function(){
      socket.unsyncUpdates('Therapist');
    });



    $scope.updateTreatment = function(update) {
      console.log('i clicked');
      TherapistService.update({
        id: update._id
      }, update, function(update) {
        console.log('update therapist', update);
      });

    };



    $scope.deleteTreatment = function(things) {
      TherapistService.delete({
        id: things._id
      }, function(things) {
        console.log('delete therapist', things);
      });
    };
  });
